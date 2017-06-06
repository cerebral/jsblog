import React from 'react';
import Article from '../../../components/Article';
import createSessionSequence from '../common/createSessionSequence';

const tempArticle = `
# The second case for function-tree

Talking about new concepts is difficult. Especially when those concepts aim to solve complexity. The initial article on function-tree was a very direct approach. It might not have made much sense, cause there was nothing to compare it to. Well, in this article we are going to go from a single promise to a complete function-tree, talking about what problems it solves a long the way.

## A promise
If you are not familiar with promises it is explained as "a future value". Think of it as a wrapper for a value you can only access with a callback:

\`\`\`javascript
const promisedValue = Promise.resolve('foo')

promisedValue.then(function (value) {
  value // "foo"
})
\`\`\`

Now typically you would not just resolve a value, but you would execute something to create that value:

\`\`\`javascript
const promisedValue = new Promise(function (resolve, reject) {
  ajax.get('/items', function (error, result) {
    if (error) reject(error)
    else resolve(result)
  })
})

promisedValue
  .then(
    function (result) {},
    function (error) {}
  )
\`\`\`

Creating a promise allows you to either resolve with a value or reject with an error. Now, the good thing about promises is its ability to create a flow.

## Promise flow

\`\`\`javascript
// We create a factory that takes a url and returns
// a promise of fetching data
function get (url) {
  return new Promise(function (resolve, reject) {
    ajax.get(url, function (error, result) {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

function startFlow (bananasUrl, applesUrl) {
  let bananasResult

  // BAD: running side effect from outer scope
  return get(bananasUrl)
    // BAD: Not declarative cause need to assign to outer scope
    .then(function (bananas) {
      // BAD: assigning to outer scope
      bananasResult = bananas

      // BAD: running side effect from outer scope
      return get(applesUrl)
    })
    // BAD: Not declarative cause need to get value from outer scope
    .then(function (apples) {
      const fruitBasket = [bananasResult, apples]

      return fruitBasket
    })
    .catch(function (error) {

    })
}

startFlow('/bananas', '/apples')
\`\`\`

So this is a typical way to create a promise flow. You start with a promise and add to it. At the end you catch any possible errors (if you bother). Even though promises are a great concept, it is very low level and it is difficult to discipline yourself to write good code. For example with the code above I show off some typical problems you can get yourself into:

1. The flow accesses variables in its outer scope. **applesUrl**. With promises you easily get into a mess of pointing to outer scope variables, making your code harder to understand and reason about. Basically it is more difficult to write declarative code
2. With promises you typically return only one value, meaning that a concept for "passing on values" from previous steps is not opinionated. The example above creates a variable that is assigned later. This is not ideal
3. Our side effect (ajax) is also accessed in the outer scope. This makes promise flows harder to test. Even though promises hints to be a great concept for declarative code, where each **.then** just references a function, it is difficult to do in practice

Maybe you already have ideas to make this code better, that is great! Maybe you feel provoked as "this is not the way to write promises", great! We have something in common :) My point with this example is to show that Promises are low level and gives a lot of freedom, freedom that can easily move you down the wrong path.

So how can we make this flow better?
`;

function createResponse({ props, render }) {
  return render(
    <Article />,
    createSessionSequence(props.session, [
      function({ state }) {
        state.set('app.article', tempArticle);
      },
    ])
  ).then(response => ({ response }));
}

export default createResponse;
