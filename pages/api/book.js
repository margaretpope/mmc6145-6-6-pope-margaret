import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

// this handler runs for /api/book with any request method (GET, POST, etc)
export default withIronSessionApiRoute(
  async function handler(req, res) {
    // TODO: On a POST request, add a book using db.book.add with request body 
    // TODO: On a DELETE request, remove a book using db.book.remove with request body 
    // TODO: Respond with 404 for all other requests
    // User info can be accessed with req.session
    // No user info on the session means the user is not logged in
    const user = req.session.user
    if (!user) {
      return res.status(401).json({error: "login required"})
    }
    switch(req.method) {
      case 'POST':
        const addBook = await db.book.add(user.id, req.body)
        if (!addBook) {
          return res.status(401).end()
        }
        return res.status(200).json({book: addBook})
      case 'DELETE':
        const deleteBook = await db.book.remove(user.id, req.body.id)
        if (!deleteBook) {
          return res.status(401).end()
        }
        return res.status(200).json({book: deleteBook})
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)
