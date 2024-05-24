const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function createDatabase() {
  try {
    // Connect to MongoDB server
    await client.connect();

    // Select database
    const database = client.db('userbiodata');

    // Create users collection (if not exists)
    const usersCollection = database.collection('users');

    // Drop users collection (if already exists)
    await usersCollection.drop();

    // Create hashed password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create user document
    const newUser = {
      username: 'example_user',
      email: 'example@example.com',
      password: hashedPassword
    };

    // Insert user document into users collection
    await usersCollection.insertOne(newUser);

    console.log('Database and document created successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close MongoDB connection
    await client.close();
  }
}

// Call the function to create the database
createDatabase();
