# ADR2
## Dependency injection

Dependency injection is a technique that allows one object to become the dependancy of
the other object. 

Certain functionality is being repeated in various modules. Hence it would be better 
to implement dependancy injection. As the code is evolving we dont have to change the structure  of the class. 
It is a usefull techique for testing as it allows the dependencies to be mocked or stubbed out. 

## Decision

Use Dependancy injection. 


## Status

Accepted



