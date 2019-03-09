# hotchocolate-auth-testcase
Test case to show the authorization bug on hotchocolate 8.0

The authtest is the graphql server, using JWT authentication and authorization.

The mutation is responsible for creating a token.
There are 3 fields on the query.

queryOne does not need authorization

queryTwo needs ROLE1

queryThree needs ROLE3.

The token returned by the mutation only has 2 roles: ROLE1 and ROLE2.

Seens like the authorize directive is only checking if the user is authenticated, and the roles are not being considered.

The authtest-client was build to demonstrate the problem.

There is a button to authenticate (runs the mutation and stores the token on the localStorage), a button to clean the localStorage, and
a button for each query.
If not authenticated, queryOne should run, and queries two and three should fail.
If authenticated, queryOne should run, queryTwo should also run and queryThree should fail, because the user does not have ROLE3,
but it does not fail and runs normaly.

# How to run the project
Run authtest in visual studio

Run authtest-client with yarn start (do a yarn install first). Check package.json if the port for the authtest server is the correct one on the "proxy" entry.
