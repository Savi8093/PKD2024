"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* End of type declarations */
/**
 * Make a new binary expression
 * @param operator the operator
 * @param lhs the left argument of the operator
 * @param rhs the right argument of the operator
 * @precondition the operator is either "+"or "-".
 * @returns the binary expression "lhs operator rhs", or undefined if the
 *     operator is not supported
 */
function make_binary_expression(operator, lhs, rhs) {
    if (operator === "+" || operator === "-") {
        return [operator, lhs, rhs];
    }
    else {
        return undefined;
    }
}
/**
 * Get the left-hand operand of a binary expression
 * @param expr a binary expression
 * @returns the left-hand operand of expr
 */
function get_lhs(expr) {
    return expr[1];
}
/**
 * Get the right-hand operand of a binary expression
 * @param expr a binary expression
 * @returns the right-hand operand of expr
 */
function get_rhs(expr) {
    return expr[2];
}
/**
 * Make a new binary addition expression.
 * Convenience function.
 * @param lhs the left argument of the sum
 * @param rhs the right argument of the sum
 * @returns the binary expression "lhs + rhs"
 */
function make_add(lhs, rhs) {
    return make_binary_expression("+", lhs, rhs);
}
/**
 * Make a new binary subtraction expression.
 * Convenience function.
 * @param lhs the minuend of the difference
 * @param rhs the subtrahend of the difference
 * @returns the binary expression "lhs - rhs"
 */
function make_sub(lhs, rhs) {
    return make_binary_expression("-", lhs, rhs);
}
/**
 * Make a new numeric literal.
 * @param num the value of the literal
 * @returns the new literal with value num
 */
function make_number(num) {
    return ["number", num];
}
/**
 * Make a new string literal.
 * @param str the value of the literal
 * @returns the new literal with value str
 */
function make_string(str) {
    return ["string", str];
}
/**
 * Check if an expression is a binary expression.
 * @param expr the expression
 * @returns true if and only if expr is a binary expression
 */
function is_binary(expr) {
    if (expr === undefined) {
        return false;
    }
    else {
        var tag = expr[0];
        return tag === "+" || tag === "-";
    }
}
/**
 * Gets the operator of a unary or binary expression.
 * @param expr an expression
 * @returns the operator of expr
 */
function get_operator(expr) {
    return expr[0];
}
/**
 * Check if a binary expression is a sum.
 * @param expr the expression
 * @returns true iff expr is a sum
 */
function is_add(expr) {
    return get_operator(expr) === "+";
}
/**
 * Check if a binary expression is a difference.
 * @param expr the expression
 * @returns true iff expr is a difference
 */
function is_sub(expr) {
    return get_operator(expr) === "-";
}
/**
 * Check if an expression is a unary expression.
 * @param expr the expression
 * @returns true iff expr is a unary expression
 */
function is_unary(expr) {
    if (expr === undefined) {
        return false;
    }
    else {
        var tag = expr[0];
        return tag === "stringify" || tag === "length";
    }
}
/**
 * Makes a new unary expression
 * @param operator the operator
 * @param arg the argument of the operator
 * @precondition the operator is either "length" or "stringify".
 * @returns the binary expression "operator(rhs)", or undefined if the operator
 *     is not supported
 */
function make_unary_expression(operator, arg) {
    if (operator === "length" || operator === "stringify") {
        return [operator, arg];
    }
    else {
        return undefined;
    }
}
/**
 * Gets the operand of a unary expression.
 * @param expr a unary expression
 * @returns the operand of expr
 */
function get_operand(expr) {
    return expr[1];
}
/**
 * Check if an expression is a number literal.
 * @param expr the expression
 * @returns true iff expr is a number literal
 */
function is_number(expr) {
    return expr !== undefined && (expr[0] === "number");
}
/**
 * Gets the value of a number literal.
 * @param expr a number literal
 * @returns the value of expr
 */
function get_number(expr) {
    return expr[1];
}
/**
 * Check if an expression is a string literal.
 * @param expr the expression
 * @returns true iff expr is a string literal
 */
function is_string(expr) {
    return expr !== undefined && (expr[0] === "string");
}
/**
 * Gets the value of a string literal
 * @param expr a string literal
 * @returns the value of expr
 */
function get_string(expr) {
    return expr[1];
}
/**
 * Evaluate an expression.
 * @param expr the expression
 * @precondition all operations in expr exist and take arguments of the
 *     appropriate types
 * @returns the result of evaluating expr.
 */
function evaluate(expr) {
    function evaluate_binary(bin_expr) {
        var lhs = evaluate(get_lhs(bin_expr));
        var rhs = evaluate(get_rhs(bin_expr));
        if (!lhs || !rhs) {
            return undefined;
        }
        else if (is_number(lhs) && is_number(rhs)) {
            return is_add(bin_expr)
                ? make_number(get_number(lhs) + get_number(rhs))
                : is_sub(bin_expr)
                    ? make_number(get_number(lhs) - get_number(rhs))
                    : undefined;
        }
        else if (is_string(lhs) && is_string(rhs)) {
            return make_string(get_string(lhs) + get_string(rhs));
        }
    }
    function evaluate_unary(un_expr) {
        var op = get_operator(un_expr);
        var val = evaluate(get_operand(un_expr));
        if (!val) {
            return undefined;
        }
        else if (op === "stringify" && is_number(val)) {
            return make_string(get_number(val).toString());
        }
        else if (op === "length" && is_string(val)) {
            return make_number(get_string(val).length);
        }
    }
    return is_binary(expr)
        ? evaluate_binary(expr)
        : is_unary(expr)
            ? evaluate_unary(expr)
            : expr;
}
/**
 * Pretty print an expression.
 * @param exp the expression to print
 * @returns A string that represents the exp
 */
function pretty_print(exp) {
    function pretty_print_inner(exp) {
        function parenthesise(exp) {
            return "(" + exp + ")";
        }
        function binary_to_string(exp) {
            return is_add(exp)
                ? parenthesise(pretty_print_inner(get_lhs(exp)) + " + "
                    + pretty_print_inner(get_rhs(exp)))
                : parenthesise(pretty_print_inner(get_lhs(exp)) + " - "
                    + pretty_print_inner(get_rhs(exp)));
        }
        return is_binary(exp)
            ? binary_to_string(exp)
            : is_unary(exp)
                ? get_operator(exp) + "(" + pretty_print_inner(get_operand(exp)) + ")"
                : is_number(exp)
                    ? "" + get_number(exp)
                    : "\"" + exp + "\"";
    }
    return pretty_print_inner(exp);
}
/*
    Some basic test code
*/
var expr1 = make_sub(make_add(make_number(5), make_sub(make_number(6), make_number(8))), make_add(make_number(5), make_add(make_number(6), make_number(8))));
console.log(pretty_print(expr1));
console.log("result should be -16: " + evaluate(expr1));
var expr2 = make_add(make_unary_expression("length", make_string("hello")), make_add(make_sub(make_number(6), make_sub(make_number(8), make_number(5))), make_add(make_number(6), make_number(8))));
console.log(pretty_print(expr2));
console.log("result should be 22: " + evaluate(expr2));
var zero = make_unary_expression("stringify", make_number(0));
var expr3 = make_add(make_string("hello"), make_add(zero, make_string("world")));
console.log(pretty_print(expr3));
console.log("result should be hello0world: " + evaluate(expr3));
var expr4 = make_add(make_number(1), make_string("hello"));
console.log(pretty_print(expr4));
console.log("result should be undefined: " + evaluate(expr4));
