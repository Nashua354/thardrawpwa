/**
 * Simple expression evaluator for showWhen conditions
 * Supports basic comparisons: ==, !=, >, <, >=, <=
 * Examples: "age > 18", "agree == true", "city != 'other'"
 */

export function evaluateShowWhen(
    expression: string,
    values: Record<string, any>
): boolean {
    if (!expression.trim()) return true;

    try {
        // Simple regex to parse expressions like "field operator value"
        const match = expression.match(/^\s*(\w+)\s*(==|!=|>=|<=|>|<)\s*(.+?)\s*$/);

        if (!match) {
            console.warn('Invalid showWhen expression:', expression);
            return true;
        }

        const [, fieldName, operator, valueStr] = match;
        const fieldValue = values[fieldName];

        // Parse the comparison value
        let compareValue: any = valueStr;

        // Remove quotes if present
        if ((valueStr.startsWith('"') && valueStr.endsWith('"')) ||
            (valueStr.startsWith("'") && valueStr.endsWith("'"))) {
            compareValue = valueStr.slice(1, -1);
        }
        // Parse numbers
        else if (!isNaN(Number(valueStr))) {
            compareValue = Number(valueStr);
        }
        // Parse booleans
        else if (valueStr === 'true') {
            compareValue = true;
        }
        else if (valueStr === 'false') {
            compareValue = false;
        }
        else if (valueStr === 'null') {
            compareValue = null;
        }
        else if (valueStr === 'undefined') {
            compareValue = undefined;
        }

        // Perform comparison
        switch (operator) {
            case '==':
                return fieldValue == compareValue;
            case '!=':
                return fieldValue != compareValue;
            case '>':
                return Number(fieldValue) > Number(compareValue);
            case '<':
                return Number(fieldValue) < Number(compareValue);
            case '>=':
                return Number(fieldValue) >= Number(compareValue);
            case '<=':
                return Number(fieldValue) <= Number(compareValue);
            default:
                console.warn('Unknown operator in showWhen:', operator);
                return true;
        }
    } catch (error) {
        console.error('Error evaluating showWhen expression:', expression, error);
        return true; // Show field by default on error
    }
}

/**
 * Evaluate multiple conditions with AND logic
 * Example: "age > 18 && agree == true"
 */
export function evaluateComplexShowWhen(
    expression: string,
    values: Record<string, any>
): boolean {
    if (!expression.trim()) return true;

    try {
        // Split by && for AND conditions
        const andConditions = expression.split('&&').map(s => s.trim());

        // All conditions must be true
        return andConditions.every(condition => evaluateShowWhen(condition, values));
    } catch (error) {
        console.error('Error evaluating complex showWhen expression:', expression, error);
        return true;
    }
}

/**
 * Check if a field should be visible based on current form values
 */
export function shouldShowField(
    showWhen: string | undefined,
    formValues: Record<string, any>
): boolean {
    if (!showWhen) return true;

    // Support both simple and complex expressions
    if (showWhen.includes('&&')) {
        return evaluateComplexShowWhen(showWhen, formValues);
    } else {
        return evaluateShowWhen(showWhen, formValues);
    }
}

/**
 * Get all field dependencies for a showWhen expression
 * Used to determine which fields to watch for changes
 */
export function getFieldDependencies(expression: string): string[] {
    if (!expression.trim()) return [];

    const dependencies: string[] = [];

    // Extract field names from expressions
    const fieldMatches = expression.match(/\b(\w+)\s*(==|!=|>=|<=|>|<)/g);

    if (fieldMatches) {
        fieldMatches.forEach(match => {
            const fieldName = match.replace(/\s*(==|!=|>=|<=|>|<).*$/, '').trim();
            if (!dependencies.includes(fieldName)) {
                dependencies.push(fieldName);
            }
        });
    }

    return dependencies;
}

/**
 * Validate a showWhen expression syntax
 */
export function validateShowWhenExpression(expression: string): {
    valid: boolean;
    error?: string;
} {
    if (!expression.trim()) return { valid: true };

    try {
        // Check for basic syntax
        const basicPattern = /^\s*(\w+)\s*(==|!=|>=|<=|>|<)\s*(.+?)\s*$/;
        const complexPattern = /^.+(\s*&&\s*.+)*$/;

        if (!basicPattern.test(expression) && !complexPattern.test(expression)) {
            return {
                valid: false,
                error: 'Invalid expression format. Use: field operator value (e.g., "age > 18")'
            };
        }

        // Try to parse each condition
        const conditions = expression.split('&&').map(s => s.trim());

        for (const condition of conditions) {
            if (!basicPattern.test(condition)) {
                return {
                    valid: false,
                    error: `Invalid condition: "${condition}"`
                };
            }
        }

        return { valid: true };
    } catch (error) {
        return {
            valid: false,
            error: error instanceof Error ? error.message : 'Unknown validation error'
        };
    }
}
