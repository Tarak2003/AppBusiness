import Product from '../models/product';

const PRODUCTS = [
    new Product(
        'p1',
        'u1',
        'Biriyani',
        'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/yot9zfocxiqxeghusxny',
        '150',
        'Tasty Biriyani'
    ),
    new Product(
        'p2',
        'u1',
        'Pani Puri',
        'https://www.vegrecipesofindia.com/wp-content/uploads/2021/09/pani-puri-1.jpg',
        '50',
        'Tasty Pani Puri'
    ),
    new Product(
        'p3',
        'u1',
        'Chole Bature',
        'https://www.secondrecipe.com/wp-content/uploads/2016/04/channa-bhatura-500x500.jpg',
        '100',
        'Tasty Chole Bature'
    ),
    new Product(
        'p4',
        'u1',
        'Masala Dosa',
        'https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa-500x500.jpg',
        '80',
        'Tasty Masala Dosa'
    ),
    new Product(
        'p5',
        'u1',
        'Pav Bhaji',
        'https://www.cookwithmanali.com/wp-content/uploads/2018/05/Best-Pav-Bhaji-Recipe.jpg',
        '110',
        'Tasty Pav Bhaji'
    ),
    new Product(
        'p6',
        'u2',
        'Pizza',
        'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900',
        '350',
        'Tasty Pizza'
    ),
    new Product(
        'p7',
        'u2',
        'Pasta',
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F09%2F17%2Fcream-tomato-rigatoni-FT-RECIPE1020.jpg',
        '250',
        'Tasty Pasta'
    )
];

export default PRODUCTS