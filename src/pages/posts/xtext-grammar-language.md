---
title: "Creating a Domain Specific Language with Xtext: The Grammar"
date: "2020-05-15"
category: programming-languages
---

Lately, I've been studying a lot about [Xtext](https://www.eclipse.org/Xtext/). If you are unfamiliar with it, this is a framework for creating programming languages integrated with the Eclipse IDE. It comes with a lot of stuff out of the box to make building both general-purpose and domain-specific languages way easier.

To give myself a brief introduction to the framework, I've thought about following along the proposed implementation of an expression language described in the book *Implementing Domain-Specific Languages with Xtext and Xtend* by Lorenzo Bettini, which I've been using for reference and study. This expression language should have enough features to introduce us to the core elements of the framework while at the same time being simple enough so that it can be implemented rather quickly (in a few blog posts, I hope). I intend to present some basics about the framework for those who never used it, but I would first recommend to attempt this very useful [15 minute introduction](https://www.eclipse.org/Xtext/documentation/102_domainmodelwalkthrough.html) to Xtext which is very useful to grasp the core elements of the framework.

You will find the complete code from the author itself at [this repository](https://github.com/LorenzoBettini/packtpub-xtext-book-2nd-examples/tree/master/org.example.xbase.expressions.parent). The code in there contains a lot more to it them what I will be covering in these posts, but I hope that the material here is enough to introduce the most important aspects of Xtext.

### First of all, what is a DSL?

A DSL is a Domain Specific Language. Differently from a General Purpose Language (like Python, Javascript and C++), a DSL can only deal with stuff that it was designed for. There are lots of examples of DSLs out there: [Dot](https://www.graphviz.org/doc/info/lang.html) for defining graphs with *Graphviz*, SQL for databases, Latex for document layout, etc...

Martin Fowler is a big proponent of Domain Specific Languages and I suggest you take a look at some of his [blog posts](https://martinfowler.com/dsl.html).

### Why would you use a DSL?

DSLs can be designed in such a way as to convey information more easily to whoever is using it. For instance, take a look at this simple SQL command:

```sql
SELECT * FROM table_name;
```

By using SQL to query data, you can easily express what you want the computer to do. It's also very easy to modify it. The end result is that you can be that much more productive when using a DSL for this kind of application.

### Implementing your own DSL

We will be using Xtext to implement a very simple DSL for dealing with logic and arithmetic expressions. Why Xtext? Like I said previously, Xtext is a framework for developing programming languages (both general and domain specific), so it gives us a lot of infrastructure for free (things like parsers, compilers, typecheckers, etc...). Also, it's part of the Eclipse ecosystem, so you get automatic editing support for it.

There's also an alternative for Xtext called [MPS](https://www.jetbrains.com/mps/) by JetBrains.

### Grammar basics

The grammar is at the core of a programming language implementation. It describes how your language works and behaves and how end users will deal with it. You also need to write some kind of parser so that, later on, a compiler or interpreter can turn statements written with it into useful machine code.

Luckly for us, XText already comes with a parser bundled up and a way to define those grammars. After you've installed it in your Eclipse (you can find download links [here](https://www.eclipse.org/Xtext/download.html)), you can create a new Xtext project by going to *File -> New -> Project -> Xtext -> Xtext Project*. Choose a name and a file extension for your project, and Xtext will generate a bunch of projects inside your workspace. Right now, we are going to focus on the first project. Assuming you named your project *expressions*, this is going to be *org.example.expressions*.

Now, just look for a file called *Expressions.xtext*. This is a very important file because it contains the base definitions for your language grammar.

If you open this file, you will notice that Xtext already created a simple "Hello World" grammar in there, that probably looks something like this:

```java
grammar org.example.expressions.Expressions
    with org.eclipse.xtext.common.Terminals
 
generate expressions 
    "http://www.example.org/expressions/Expressions"
 
Model:
    greetings+=Greeting*;
  
Greeting:
    'Hello' name=ID '!';
```

It's worthwhile to spend some time to understand what is happening here. The first line of code is declaring the name of the language and of the grammar itself. Notice also that it reuses a grammar called `Terminals`. This grammar defines common rules for things such as quoted strings, comments, numbers, etc... Those basic definitions are somewhat common between all programming languages. By extending this grammar, we are allowed to focus just on the core aspects of our language.

The `generate` declaration defines some rules for a thing called [EMF](https://www.eclipse.org/Xtext/documentation/308_emf_integration.html), but we don't need to touch this right now.

After that, the rules for the actual grammar begins. Take a look at the following line of code:

```java
Model:
    greetings+=Greeting*;
```

The is called a *rule* in the context of our grammar. The first rule in a grammar is always used as the start rule. This rule is called `Model` and it contains a feature called `greetings`, which consists of a collection of `Greeting` elements. The `+=` implies that this is, in fact, a collection, while the operator `*` indicates that the number of elements in this collection is arbitrary.

Right below that, we find the definition for `Greeting`:

```java
Greeting:
    'Hello' name=ID '!';
```
In Xtext, string literals correspond to keywords in the DSL. Right there, `'Hello'` would be a keyword in this sample language, as well as the `'!'` symbol. A valid statement in this language would start with `Hello`, followed by an `ID`, which comes from the `Terminals` grammar. Think about this `ID` as a placeholder for some non-terminal symbol that the user would write with this language. We are attributing this symbol to the `name` feature.

Now, let's start changing those rules to reflect the expression language we want to develop. It's important to begin with some kind of specification. What is the purpose of this language and what it looks like?

Let's say we want to write expressions statements such as these using this language:

```
var <ID> = <Expression>
eval <Expression>
```

In a nutshell, we want this language to allow for declaring expressions and evaluating them. One way to achieve such functionality is by introducing an abstract class that for evaluations and variable declarations. So, our grammar would look something like this:

```java
ExpressionsModel:
	elements += AbstractElement*;

AbstractElement:
	Variable | EvalExpression ;

Variable:
	'var' name=ID '=' expression=Expression;

EvalExpression:
	'eval' expression=Expression;

Expression:
	{IntConstant} value=INT |
	{StringConstant} value=STRING |
	{BoolConstant} value=('true'|'false');
	{VariableRef} variable=[Variable];
```

This kind of structure can look daunting at first, but it doesn't take much to get used to it. In a nutshell, this is describing a very simple grammar whose root element is called `ExpressionsModel`, which is comprised of an arbitrary number of `AbstractElement` elements. The declaration for this `AbstractElement` is right below, and we can see that it depends on two other rule declarations: one for `Variable` and another for `EvalExpression` (and a single `AbstractElement` can be either one or the other, as indicated by the `|` operator).

Both `Variable` and `EvalExpression` define keywords for `var` and `eval` and depend upon one more rule: `Expression`, which is defined below. `Expression` is defined as being either an `IntConstant`, a `StringConstant`, a `BoolConstant` or a `VariableRef` (a reference to a variable previously defined). The notation of these lines of codes:

```java
Expression:
	{IntConstant} value=INT |
	{StringConstant} value=STRING |
	{BoolConstant} value=('true'|'false');
```

Is equivalent to:

```java
Expression:
	IntConstant | StringConstant | BoolConstant;

IntConstant: value=INT;
StringConstant: value=STRING;
BoolConstant: value=('true'|'false');
```

And that's it. By writing those rules you've just created the basic skeleton of a very simple language. Xtext can now use those rules to generate a parser for this sample language and do a lot of the hard work for you.

### Left-recursive grammars

Expressions such as addition and multiplication require recursive rules, since both are examples of expressions whose left and right parts are expressions themselves.

It's only natural to think about this problem the following way:

```java
Expression:
	{Plus} left=Expression '+' right=Expression;
```

Unfortunately that rule would result in an Xtext error message. That's because Xtext uses [ANTLR](https://www.antlr.org/), which is a tool that builds a parser from grammar rules such as the ones we're writing here. Since ANTLR uses a top-down strategy for parsing, it can't deal with left recursion.

> We say that a rule is left-recursive when the first symbol of the rule is non-terminal and refers to the rule itself.

We can solve this problem by using a technique called *left factoring*. To do that, we will have to deal with operator precedence and associativity.

We will use the following trick for getting rid of the left recursion:

```java
Expression:
	{Plus} left=Atomic ('+' right=Expression)?;

Atomic returns Expression:
	{IntConstant} value=INT |
	{StringConstant} value=STRING |
	{BoolConstant} value=('true'|'false');
	{VariableRef} variable=[Variable];
```

Here, we're stating that an addition consists of a left part which is an atomic expression (it cannot be broken down further into smaller expressions) and an optional right part which is, recursively, an expression (right recursion is not a problem with ANTLR).

This solution still has a problem. All of our expressions will be considered as a `Plus` object now. That's not really elegant.

What we want to do is try to parse the expression using the atomic rule and search for an optional `+` followed by an expression. If no optional part is found, then the expression is just the element parsed with the `Atomic` rule described above. Else, we instantiate a `Plus` object with a left and right parts accordingly.

We can express these operations as follows:

```java
Expression:
	Atomic ({Plus.left=current} '+' right=Expression)?;
```

Where `Plus.left=current` is an [assigned action](https://www.eclipse.org/Xtext/documentation/301_grammarlanguage.html#grammar-actions). That does the trick. If the code inside `(...)?` can be parsed, the result tree will consist of a `Plus` object where `left` is assigned to a subtree previously parsed by the `Atomic` rule and right to the subtree parsed by the `Expression` rule. 

As for now, our `Expression` allows for right associativity (since it's right recursive). Languages like Java use left associativity, so let's modify our grammar to use that instead:

```java
Expression:
	Atomic ({Plus.left=current} '+'right=Atomic)*;
```

Notice here that we are using `right=Atomic` instead of `right=Expression'`. Next, we add substractions into the mix:

```java
Expression:
	Atomic (
	({Plus.left=current} '+' | {Minus.left=current} '-')
	right=Atomic
)*;
```

Here, the assigned action will be selected according to the parsed operator. 

That's enough for associativity. Next, we must establish *precedence*. Addition and subtraction have the same arithmetic precedence, but if we add multiplication and division we must deal with that issue.

To define precedence, we write the rule for the operator with less precedence in terms of the operator with higher precedence.

Our new grammar looks like this:

```java
Expression: PlusOrMinus;

PlusOrMinus returns Expression:
    MulOrDiv (
        ({Plus.left=current} '+' | 
            {Minus.left=current} '-')
        right=MulOrDiv
)*;

MulOrDiv returns Expression:
	Atomic (
		({MulOrDiv.left=current} op=('*'|'/'))
	right=Atomic
)*;
```

Now, we want to add boolean expressions and comparisons to our language, again dealing with issues of precedence.

From lowest to highest precedence:

1. OR
2. AND
3. Equality and dis-equality (== , ≠)
4. Comparisions (>, ≥, <, ≤)
5. Addition and subtraction
6. Multiplication and division

And we end up with the following grammar:

```java
Expression: Or;

Or returns Expression:
	And({Or.current=left} "||" right=And)*;

And returns Expression:
	Equality({And.left=current} "&&" right=Equality)*;

Equality returns Expression:
	Comparision(
		{Equality.left=current} op=("=="|"!=")
		right=Comparison
)*;

Comparision returns Expression:
	PlusOrMinus (
		{Comparison.left=current) op=(">="|"<="|">"|"<")
		right=PlusOrMinus
)*;
```

Adding a case for negation `!`:

```java
Atomic returns Expression:
	'(' Expression ')' |
	{Not} "!" expression=Atomic |
	... as before
```

The negation operator has the highest precedence overall, so that's why we add it as a case in the Atomic rule.

As a final step, let's refactor the `Atomic` rule to include only atomic elements. We introduce the `Primary` rule:

```java
MulOrDiv returns Expression:
	Primary (
		{MulOrDiv.left=current} op=('*'|'/')
		right=Primary
)*;

Primary returns Expression:
	'(' Expression ')' |
	{Not} "!" expression=Primary |
	Atomic
;

Atomic returns Expression:
	{IntConstant} value=INT |
	{StringConstant} value=STRING |
	{BoolConstant} value=('true'|'false') |
	{VariableRef} variable=[Variable]
;
```

### The full grammar

After all of that, the base grammar looks like this:

```java
ExpressionsModel:
	elements += AbstractElement*;
AbstractElement:
	Variable | EvalExpression ;
Variable:
	'var' name=ID '=' expression=Expression;
EvalExpression:
	'eval' expression=Expression;
Expression: Or;

Or returns Expression:
	And ({Or.left=current} "||" right=And)*
;
And returns Expression:
	Equality ({And.left=current} "&&" right=Equality)*;
Equality returns Expression:
	Comparison (
		{Equality.left=current} op=("=="|"!=")
		right=Comparison
	)*
;
Comparison returns Expression:
	PlusOrMinus (
		{Comparison.left=current} op=(">="|"<="|">"|"<")
		right=PlusOrMinus
	)*
;
PlusOrMinus returns Expression:
	MulOrDiv (
		({Plus.left=current} '+' | {Minus.left=current} '-')
		right=MulOrDiv
)*
;
MulOrDiv returns Expression:
	Primary (
		{MulOrDiv.left=current} op=('*'|'/')
		right=Primary
	)*
;
Primary returns Expression:
	'(' Expression ')' |
		{Not} "!" expression=Primary |
		Atomic
;
Atomic returns Expression:
	{IntConstant} value=INT |
	{StringConstant} value=STRING |
	{BoolConstant} value=('true'|'false') |
	{VariableRef} variable=[Variable]
;
```

### Conclusion

This first blog post attempted to presetn an overview of the basic aspects of writing a programming language grammar using the Xtext framework. Even for a rather lengthy blog post, I've barely scratched the surface of a very large topic. I suggest that you expand on that by studying [Xtext docs on grammar rules](https://www.eclipse.org/Xtext/documentation/301_grammarlanguage.html).