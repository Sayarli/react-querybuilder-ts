
## Installation

To install `react-querybuilder`, use [npm](https://www.npmjs.com/package/react-querybuilder) or [Yarn](https://yarnpkg.com/package/react-querybuilder). A [UMD build](./umd) is also available.

```bash
npm i react-querybuilder
# OR
yarn add react-querybuilder
```

## Basics

The simplest way to create a query builder is to render the `QueryBuilder` component with no props. (Be sure to import the official stylesheet, which is available in `.css` and `.scss` flavors.)


```tsx
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

export default () => <QueryBuilder />;
```


Functional, but not very useful. To really get value out of the query builder, we'll first need to define a set of fields for the user to choose from. We can pass the `fields` array into the query builder through the `fields` prop.



```tsx
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

export default () => <QueryBuilder fields={fields} />;
```


Much more useful, but you probably want to monitor and control what users do with the query builder. Let's set up a state variable using the React Hook `useState`. This will store our query object and allow us to pass it on to other components, event handlers, etc.

The state variable `query` will be passed to the `query` prop, and the setter method `setQuery` will be used in the `onQueryChange` callback. Let's also seed the query object with a couple of rules, making sure that the `field` property of each rule matches the `name` property of one of our fields.


```tsx
import { useState } from 'react';
import { Field, QueryBuilder, RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

export default () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [
      { field: 'firstName', operator: '=', value: 'Steve' },
      { field: 'lastName', operator: '=', value: 'Vai' },
    ],
  });

  return <QueryBuilder fields={fields} query={query} onQueryChange={q => setQuery(q)} />;
};
```


<details>
<summary>Non-TypeScript version</summary>

```jsx
import { useState } from 'react';
import { QueryBuilder } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

export default () => {
  const [query, setQuery] = useState({
    combinator: 'and',
    rules: [
      { field: 'firstName', operator: '=', value: 'Steve' },
      { field: 'lastName', operator: '=', value: 'Vai' },
    ],
  });

  return <QueryBuilder fields={fields} query={query} onQueryChange={q => setQuery(q)} />;
};
```

</details>

## Exporting queries

To convert a query object into other formats like [SQL](https://en.wikipedia.org/wiki/SQL), [MongoDB](https://www.mongodb.com/), and [CEL](https://github.com/google/cel-spec), you can use the `formatQuery` function ([full documentation here](./api/export)). The example below demonstrates the conversion of a query to its equivalent SQL form. Modify the query by manipulating the form elements and the SQL will update accordingly.


```tsx
import { useState } from 'react';
import { Field, formatQuery, QueryBuilder, RuleGroupType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.scss';

const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

export default () => {
  const [query, setQuery] = useState<RuleGroupType>({
    combinator: 'and',
    rules: [
      { field: 'firstName', operator: 'beginsWith', value: 'Stev' },
      { field: 'lastName', operator: 'in', value: 'Vai,Vaughan' },
    ],
  });

  return (
    <>
      <QueryBuilder fields={fields} query={query} onQueryChange={q => setQuery(q)} />
      <h4>
        SQL as result of <code>formatQuery(query, 'sql')</code>:
      </h4>
      <pre>{formatQuery(query, 'sql')}</pre>
    </>
  );
};
```

To discover all the options of React Query Builder, check out the [API documentation](https://react-querybuilder.js.org/docs/category/api)."# machine-learning-denemeler" 
