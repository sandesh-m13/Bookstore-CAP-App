using {
    cuid,
    managed
} from '@sap/cds/common';

namespace tutorial.db;

entity Books : cuid, managed {
    title       : String;
    author      : Association to Authors;
    //managed association
    genre       : String;
    publishedAt : Date;
    pages       : Integer;
    price       : Decimal(9, 2);
    Chapters    : Composition of many Chapters
                      on Chapters.book = $self;
//composition to chapter entity
}

entity Authors : cuid, managed {
    name  : String;
    books : Association to many Books
                on books.author = $self;
//unmanaged association
}

entity Chapters : cuid, managed {
    key book   : Association to Books;
        number : Integer;
        title  : String;
        pages  : Integer;

}
