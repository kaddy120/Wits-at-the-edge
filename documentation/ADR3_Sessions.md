# ADR5_Sessions: Use of sessions over tokens

## Overview
Sessions act as a means to store simple pieces of data against a session ID, while the webapp container manages the storage of these and relates them to the session ID.
This is used to implement authentication by storing the logged in user into the session, if a user is present in the session, then this is the user we are
authenticated as.
Storing additional data into the session as needed, such as the user’s set of permissions or anything else that is potentially useful is permissiable.

## Decision
We will use sessions to authenticate a user and store additional data of the user through their interaction with the web app.


## Status
Accepted

## Consequences

      ## Advantages
      It is easy to implement

      Accessing data is fast because it stores session data in-memory object 

      It ensures platform scalability and it works in multi-process configuration

      It ensures data durability, since the session state retains data even if the ASP.NET work process restarts

     ## Disadvantages
     Session state data is stored in server memory, it is not advisable to use session state when you are working with large sum of data

     Session state will affect performance ofmemory because session state variables stays in memory until the state is destroyed

     