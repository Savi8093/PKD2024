"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* End of type declarations */
/**
 * Make a new binary numeric expression
 * @param operator the operator
 * @param lhs the left argument of the operator
 * @param rhs the right argument of the operator
 * @precondition the operator is either "+"or "-".
 * @returns the binary expression "lhs operator rhs", or undefined if the
 *     operator is not supported
 */
function make_binary_nexpr(operator, lhs, rhs) {
    return operator === "+" || operator === "-"
        ? [operator, lhs, rhs]
        : undefined;
}
/**
 * Get the left-hand operand of a binary numeric expression.
 * @param expr a binary numeric expression
 * @returns the left-hand operand of expr
 */
function get_nlhs(expr) {
    return expr[1];
}
/**
 * Get the right-hand operand of a binary numeric expression.
 * @param expr a binary numeric expression
 * @returns the right-hand operand of expr
 */
function get_nrhs(expr) {
    return expr[2];
}
/**
 * Make a new binary addition expression.
 * Convenience function.
 * @param lhs the left argument of the sum
 * @param rhs the right argument of the sum
 * @returns the binary expression "lhs + rhs"
 */
function make_nadd(lhs, rhs) {
    return make_binary_nexpr("+", lhs, rhs);
}
/**
 * Make a new binary subtraction expression.
 * Convenience function.
 * @param lhs the minuend of the difference
 * @param rhs the subtrahend of the difference
 * @returns the binary expression "lhs - rhs"
 */
function make_nsub(lhs, rhs) {
    return make_binary_nexpr("-", lhs, rhs);
}
/**
 * Check if an expression is a binary numeric expression.
 * @param expr the expression
 * @returns true iff expr is a binary numeric expression
 */
function is_nbinary(expr) {
    var tag = expr[0];
    return tag === "+" || tag === "-";
}
/**
 * Get the operator of a binary numeric expression.
 * @param expr an expression
 * @returns the operator of expr
 */
function get_noperator(expr) {
    return expr[0];
}
/**
 * Check if a binary numeric expression is a sum.
 * @param expr the expression
 * @returns true iff expr is a sum
 */
function is_nadd(expr) {
    return get_noperator(expr) === "+";
}
/**
 * Check if a binary numeric expression is a difference.
 * @param expr the expression
 * @returns true iff expr is a difference
 */
function is_nsub(expr) {
    return get_noperator(expr) === "-";
}
/**
 * Makes a new length expression.
 * @param str the argument of the length operator
 * @returns the unary expression "length(str)"
 */
function make_length_expr(str) {
    return ["length", str];
}
/**
 * Check if a numeric expression is a length expression.
 * @param expr the expression
 * @returns true iff expr is a length expression
 */
function is_length_expr(num) {
    return num[0] === "length";
}
/**
 * Get the argument of a length expression.
 * @param expr an expression
 * @returns the argument of expr
 */
function get_sarg(expr) {
    return expr[1];
}
/**
 * Makes a new stringify expression.
 * @param expr the argument of the stringify operator
 * @returns the unary expression "stringify(expr)"
 */
function make_stringify_expr(expr) {
    return ["stringify", expr];
}
/**
 * Check if a string expression is a stringify expression.
 * @param expr the expression
 * @returns true iff expr is a stringify expression
 */
function is_stringify_expr(str) {
    return str[0] === "stringify";
}
/**
 * Get the argument of a stringify expression.
 * @param expr an expression
 * @returns the argument of expr
 */
function get_narg(expr) {
    return expr[1];
}
/**
 * Make a new binary string concatenation expression.
 * @param str1 the prefix of the concatenated string
 * @param str2 the suffix of the concatenated string
 * @returns the concatenated string str1 + str2
 */
function make_concat_expr(str1, str2) {
    return ["concat", str1, str2];
}
/**
 * Check if a string expression is a concatenation expression
 * @param str the expression
 * @returns true iff expr is a concatenation expression
 */
function is_concat_expr(str) {
    return str[0] === "concat";
}
/**
 * Get the prefix of a string concatenation.
 * @param str an expression
 * @returns the prefix of expr
 */
function get_slhs(str) {
    return str[1];
}
/**
 * Get the suffix of a string concatenation.
 * @param str an expression
 * @returns the suffix of expr
 */
function get_srhs(str) {
    return str[2];
}
/**
 * Makes a new literal value.
 * @template T the type of the value (number of string)
 * @param val value of the literal
 * @returns a literal with value val
 */
function make_literal(val) {
    return ["literal", val];
}
/**
 * Check if a string expression is a string literal.
 * @param str the expression
 * @returns true iff expr is a string literal
 */
function is_sliteral(str) {
    return str[0] === "literal";
}
/**
 * Check if a numeric expression is a numeric literal.
 * @param str the expression
 * @returns true iff expr is a numeric literal
 */
function is_nliteral(str) {
    return str[0] === "literal";
}
/**
 * Get the value of a literal expression.
 * @template T the type of the value (number or string)
 * @param expr the literal expression
 * @returns the value of expr
 */
function get_value(expr) {
    return expr[1];
}
/**
 * Evaluate a numeric expression.
 * @param expr the expression
 * @returns the result of evaluating expr.
 */
function evaluate_number(expr) {
    function evaluate_binary(bin_expr) {
        var lhs = evaluate_number(get_nlhs(bin_expr));
        var rhs = evaluate_number(get_nrhs(bin_expr));
        if (is_nadd(bin_expr)) {
            return make_literal(get_value(lhs) + get_value(rhs));
        }
        else {
            return make_literal(get_value(lhs) - get_value(rhs));
        }
    }
    function evaluate_length(expr) {
        return make_literal(get_value(evaluate_string(get_sarg(expr))).length);
    }
    return is_nbinary(expr)
        ? evaluate_binary(expr)
        : is_length_expr(expr)
            ? evaluate_length(expr)
            : expr;
}
/**
 * Evaluate a string expression.
 * @param expr the expression
 * @returns the result of evaluating expr.
 */
function evaluate_string(expr) {
    function evaluate_concat(concat_expr) {
        return make_literal(get_value(evaluate_string(get_slhs(concat_expr))) + get_value(evaluate_string(get_srhs(concat_expr))));
    }
    function evaluate_stringify(expr) {
        return make_literal(evaluate_number(get_narg(expr)).toString());
    }
    return is_concat_expr(expr)
        ? evaluate_concat(expr)
        : is_stringify_expr(expr)
            ? evaluate_stringify(expr)
            : expr;
}
/*
    Some basic test code
*/
var expr1 = make_nsub(make_nadd(make_literal(5), make_nsub(make_literal(6), make_literal(8))), make_nadd(make_literal(5), make_nadd(make_literal(6), make_literal(8))));
console.log("result should be -16: " + get_value(evaluate_number(expr1)));
var expr2 = make_nadd(make_length_expr(make_literal("hello")), make_nadd(make_nsub(make_literal(6), make_nsub(make_literal(8), make_literal(5))), make_nadd(make_literal(6), make_literal(8))));
console.log("result should be 22: " + get_value(evaluate_number(expr2)));
var zero = make_stringify_expr(make_literal(0));
var expr3 = make_concat_expr(make_literal("hello"), make_concat_expr(zero, make_literal("world")));
console.log("result should be hello0world: " + get_value(evaluate_string(expr3)));
// not possible
//console.log(make_nadd(make_literal(1), make_literal("hello")));
