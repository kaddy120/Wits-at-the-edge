# ADR4_Redis Database: Use of Redis database to store chats and sessions

## Overview
Redis, which stands for Remote Dictionary Server, is a fast, open-source, in-memory key-value data store for use as a database, cache, message broker, and queue.
Redis delivers sub-millisecond response times enabling millions of requests per second for real-time applications
All Redis data resides in-memory, in contrast to databases that store data on disk or SSDs.


## Decision
We will use Redis to store chats and sessions.


## Status
Accepted

## Consequences

      ## Advantages
      Eliminates the need to access disks

      In-memory data stores such as Redis avoid seek time delays and can access data in microseconds(fast)

      Flexible Data Structures: Unlike simplistic key-value data stores that offer limited data structures, Redis has a vast variety of data structures to meet 
      your application needs.
      
     
      Simplicity and ease-of-use: Redis simplifies your code by enabling you to write fewer lines of code to store, access, and use data in your applications.
  

      High availability and scalability: Redis offers a primary-replica architecture in a single node primary or a clustered topology. This allows you to build 
      highly available solutions providing consistent performance and reliability.

      Extensibility: Redis is an open source project supported by a vibrant community.

     ## Disadvantages
     It doesn’t have inbuilt encryption on the wire.

     No role-based account control (RBAC).

     Can be difficult to deploy in large-scale cloud deployments.

     