const {db, config} = require('./pgp');
let data = require('./product_aps.json');

for (let count in data) {
    data[count].category = 21

    db.any(
        'insert into public.bookstore(author, id_category, isnb, description, link_dowload, file_format, file_size, images, language, name, pages, read_online, year)' +
        'values (${author},${category},${code},${content},${download_links},${file_format},${file_size},${img},${language},${name},${pages},${read_online},${year})',
        data[count]
    ).then(()=>{
        console.log('insert location succeed');
    })
        .catch(error => {
            console.log('error',error);
        });
}