const { get, post, put, del } = require('./index');

const testHttpClient = async () => {
    try {
        // Test GET request
        const getResponse = await get('https://jsonplaceholder.typicode.com/posts/1');
        console.log('GET response:', getResponse);

        // Test POST request
        const postResponse = await post(
            'https://jsonplaceholder.typicode.com/posts',
            { 'Content-Type': 'application/json' },
            JSON.stringify({ title: 'foo', body: 'bar', userId: 1 })
        );
        console.log('POST response:', postResponse);

        // Test PUT request
        const putResponse = await put(
            'https://jsonplaceholder.typicode.com/posts/1',
            { 'Content-Type': 'application/json' },
            JSON.stringify({ id: 1, title: 'foo', body: 'bar', userId: 1 })
        );
        console.log('PUT response:', putResponse);

        // Test DELETE request
        const deleteResponse = await del('https://jsonplaceholder.typicode.com/posts/1');
        console.log('DELETE response:', deleteResponse);
    } catch (error) {
        console.error('Error:', error);
    }
};

testHttpClient();
