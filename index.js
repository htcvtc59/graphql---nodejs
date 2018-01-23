var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
type Query {
course(id:Int!):Course
courses(topic:String):[Course]
}
type Mutation{
updateCourseTopic(id: Int!, topic: String!): Course
}
type Course{
    id:Int
    title:String
    author:String
    description:String
    topic:String
    url:String
}
`);

var coursesData = [
    {
        id: 1,
        title: 'Title1',
        author: 'Andrew1',
        description: 'Learn Node.js1',
        topic: 'Node.js1',
        url: 'https://google.com'
    },
    {
        id: 2,
        title: 'Title2',
        author: 'Andrew2',
        description: 'Learn Node.js2',
        topic: 'Node.js2',
        url: 'https://google.com'
    },
    {
        id: 3,
        title: 'Title3',
        author: 'Andrew3',
        description: 'Learn Node.js3',
        topic: 'Node.js3',
        url: 'https://google.com'
    }
]

var getCourse = function (args) {
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var getCourses = function (args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic)
    } else {
        return coursesData;
    }
}
var updateCourseTopic = function ({ id, topic }) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}

var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
}

var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(process.env.PORT || 4000, () => console.log('Express GraphQL Server Now Running on http://localhost:4000/graphql'));







