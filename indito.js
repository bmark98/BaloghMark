const http = require('http');
const fs = require('fs');
const path = require('path');
var mysql = require('mysql');
const url = require('url');

// MySQL kapcsolat beállítása
const connection = mysql.createConnection({
    host: '143.47.98.96',        // Az adatbázis hostja
    user: 'studb003',             // Az adatbázis felhasználója
    password: 'xyz456',     // Az adatbázis jelszava
    database: 'db003',     // Az adatbázis neve
    charset: 'utf8mb4'  // UTF-8 kódolás biztosítása
  });
  const encodedString = 'H%C3%A1z'; // URL-enkódolt szöveg
  const decodedString = decodeURIComponent(encodedString);
connection.connect(err => {
    if (err) {
        console.error('Hiba a csatlakozáskor: ' + err.stack);
        return;
    }
    console.log('Csatlakozva az adatbázishoz');
});

// HTTP szerver beállítása
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Fájlok kiszolgálása
    if (parsedUrl.pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Hiba történt a fájl beolvasása közben');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data); // Főoldal visszaküldése
        });
    } 
    else if (parsedUrl.pathname === '/kapcsolat') {
        fs.readFile(path.join(__dirname, 'kapcsolat.html'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Hiba történt a fájl beolvasása közben');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data); // Kapcsolat oldal visszaküldése
        });
    }
    else if (parsedUrl.pathname === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Hiba történt a stíluslap beolvasása közben');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            res.end(data); // Stíluslap visszaküldése
        });
    }   

    // OOP JavaScript oldal kiszolgálása
    else if (parsedUrl.pathname === '/oop-javascript') {
        fs.readFile(path.join(__dirname, 'oop-javascript.html'), 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Hiba történt a fájl beolvasása közben');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data); // OOP Javascript oldal visszaküldése
        });
    }

    // Kapcsolat űrlap adatainak mentése
    else if (parsedUrl.pathname === '/kapcsolat' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);
            const id = data.get('id');
            const name = data.get('name');
            const message = data.get('message');
            const created_at = data.get('created_At');

            const query = 'INSERT INTO messages (id, name, message, created_at) VALUES (?, ?)';
            connection.query(query, [id, name, message, created_at], (err, result) => {
                if (err) throw err;
                res.statusCode = 302;
                res.setHeader('Location', '/');
                res.end(); // Üzenet sikeresen elmentve
            });
        });
    }
    
    // Üzenetek lekérése
    else if (parsedUrl.pathname === '/uzenetek') {
        const query = 'SELECT * FROM messages ORDER BY created_at DESC';
        connection.query(query, (err, results) => {
            if (err) throw err;
            let html = `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        margin: 0;
                        padding: 20px;
                    }
    
                    h1 {
                        color: #4CAF50;
                        text-align: center;
                    }
    
                    table {
                        width: 100%;
                        margin: 20px 0;
                        border-collapse: collapse;
                        background-color: #fff;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
    
                    th, td {
                        padding: 12px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
    
                    th {
                        background-color: #4CAF50;
                        color: white;
                    }
    
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
    
                    tr:hover {
                        background-color: #ddd;
                    }
    
                    td {
                        color: #333;
                    }
    
                    .message {
                        word-wrap: break-word;
                        max-width: 500px;
                        padding: 10px;
                        background-color: #f9f9f9;
                        border-radius: 5px;
                    }
    
                    .timestamp {
                        color: #777;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <h1>Uzenetek</h1>
                <table>
                    <tr>
                        <th>Nev</th>
                        <th>Uzenet</th>
                        <th>Datum</th>
                    </tr>`;
            
            results.forEach(msg => {
                html += `
                    <tr>
                        <td>${msg.name}</td>
                        <td><div class="message">${msg.message}</div></td>
                        <td><span class="timestamp">${msg.created_at}</span></td>
                    </tr>`;
            });
            
            html += `
                </table>
            </body>
            </html>`;
    
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html); // Üzenetek visszaküldése
        });
    }

// CRUD műveletek
else if (parsedUrl.pathname === '/crud') {
    if (req.method === 'GET') {
        // Üzenetek lekérése és megjelenítése
        const query = 'SELECT * FROM messages ORDER BY created_at DESC';
        connection.query(query, (err, results) => {
            if (err) throw err;

            let html = '<h1>CRUD Muveletek</h1>';
            html += '<h2>Uzenetek</h2>';
            html += '<table><tr><th>Nev</th><th>Uzenet</th><th>Datum</th><th>Muvelet</th></tr>';

            results.forEach(msg => {
                html += `<tr>
                            <td>${msg.name}</td>
                            <td>${msg.message}</td>
                            <td>${msg.created_at}</td>
                            <td>
                                <a href="/crud/edit?id=${msg.id}">Modosit</a> | 
                                <a href="/crud/delete?id=${msg.id}">Torol</a>
                            </td>
                          </tr>`;
            });

            html += '</table>';

            // Új üzenet hozzáadásának űrlapja
            html += `
                <h3>Uj uzenet hozzaadasa</h3>
                <form action="/crud" method="POST">
                <label for="id">ID:</label>
                <input type="text" id="id" name="id" required>
                    <label for="name">Nev:</label>
                    <input type="text" id="name" name="name" required>
                    
                    <label for="message">Uzenet:</label>
                    <textarea id="message" name="message" required></textarea>
                    <label for="created_at">Datum:</label>
                    <input type="text" id="created_at" name="created_at" required>
                    
                    <button type="submit">Hozzaadas</button>
                </form>
            `;

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        });
    }
    // Új rekord felvitele (POST)
    else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);
            const name = data.get('name');
            const message = data.get('message');

            const query = 'INSERT INTO messages (id, name, message, created_at) VALUES (?, ?)';
            connection.query(query, [id, name, message, created_at], (err, result) => {
                if (err) throw err;
                res.statusCode = 302;
                res.setHeader('Location', '/crud');
                res.end(); // Sikeres hozzáadás
            });
        });
    }
}

// Rekord módosítása
else if (parsedUrl.pathname === '/crud/edit') {
    const query = `SELECT * FROM messages WHERE id = ?`;
    const messageId = parsedUrl.query.id;
    
    connection.query(query, [messageId], (err, result) => {
        if (err) throw err;

        const msg = result[0];
        let html = `
            <h1>Uzenet modositasa</h1>
            <form action="/crud/edit?id=${msg.id}" method="POST">
                <label for="name">Nev:</label>
                <input type="text" id="name" name="name" value="${msg.name}" required>
                
                <label for="message">Uzenet:</label>
                <textarea id="message" name="message" required>${msg.message}</textarea>
                
                <button type="submit">Modosit</button>
            </form>
        `;
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}
else if (parsedUrl.pathname === '/crud/edit' && req.method === 'POST') {
    const messageId = parsedUrl.query.id;
    let body = '';
    
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        const data = new URLSearchParams(body);
        const name = data.get('name');
        const message = data.get('message');

        const query = 'UPDATE messages SET name = ?, message = ? WHERE id = ?';
        connection.query(query, [name, message, messageId], (err, result) => {
            if (err) throw err;
            res.statusCode = 302;
            res.setHeader('Location', '/crud');
            res.end(); // Üzenet sikeresen módosítva
        });
    });
}

// Rekord törlése
else if (parsedUrl.pathname === '/crud/delete') {
    const messageId = parsedUrl.query.id;
    
    const query = 'DELETE FROM messages WHERE id = ?';
    connection.query(query, [messageId], (err, result) => {
        if (err) throw err;
        res.statusCode = 302;
        res.setHeader('Location', '/crud');
        res.end(); // Üzenet sikeresen törölve
    });
}

    // Ha nem találjuk a kért oldalt
    else {
        res.statusCode = 404;
        res.end('Nem található: ' + parsedUrl.pathname);
    }
});

// Szerver indítása
const port = 8003;
const serverIP = 'localhost';
server.listen(port, serverIP, () => {
    console.log(`Szerver fut: http://:${serverIP}:${port}/`);
});