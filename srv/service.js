const cds = require('@sap/cds')

module.exports = class BookstoreService extends cds.ApplicationService {
  init() {

    const { Books } = cds.entities('BookstoreService')

    this.before('READ', Books, async (req) => {
      console.log('Before READ Books')
    })

    this.on('READ', Books, async (req, next) => {
      console.log('On Event')
      return next()

    })

    this.after('READ', Books, async (books, req) => {
      for (const book of books) {
        if (book.genre_code === 'Fantasy') {
          book.price *= 0.8 //20% discount on Fantasy books
          console.log(`You got discount of 20% for "${book.title}"`);
          book.title = `${book.title} Discount Applied!`
        }
      } 
    })
    return super.init()
  }
}
