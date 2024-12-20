const general = require('../../models/general.model')
const cate = require('../../models/admin/cateAdmin.model')
const db = require('../../config/db/connect')
const cateAdminController = () => { }

// [GET] /categories_admin/searchkey=?&page=?
cateAdminController.getCategories = async (req, res) => {
    const title = 'QUẢN LÝ DANH MỤC SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin
    let searchKey = req.query.searchKey
    let page = req.query.page ? req.query.page : 1
    let limit = 10

    let categories = await cate.getCategories(searchKey, page, limit)
    let formatFunction = await general.formatFunction()

    res.status(200).render('admin/pages/cate_admin', {
        title: title,
        admin: admin,
        data: categories,
        formatFunction: formatFunction,
    })
}

// [GET] /categories_admin/searchkey=?&page=?
cateAdminController.getProducts = async (req, res) => {
    const title = 'QUẢN LÝ SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin
    let searchKey = req.query.searchKey
    let page = req.query.page ? req.query.page : 1
    let limit = 10

    let products = await cate.getProducts(searchKey, page, limit)
    let formatFunction = await general.formatFunction()

    res.status(200).render('admin/pages/product_admin', {
        title: title,
        admin: admin,
        data: products,
        formatFunction: formatFunction,
    })
}

cateAdminController.addCategories = async (req, res) => {
    const title = 'QUẢN LÝ DANH MỤC SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin
    const categoryName = req.body.productName;
    console.log(categoryName);
    db.query('INSERT INTO categories (category_name) VALUES (?)', [categoryName], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    })

    let formatFunction = await general.formatFunction()

    res.status(200).render('admin/pages/cate_view_admin', {
        title: title,
        admin: admin,
        formatFunction: formatFunction,
    })
}

cateAdminController.getAddCategories = async (req, res) => {
    const title = 'QUẢN LÝ DANH MỤC SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin
    let formatFunction = await general.formatFunction()

    res.status(200).render('admin/pages/cate_view_admin', {
        title: title,
        admin: admin,
        formatFunction: formatFunction,
    })
}

cateAdminController.getAddProducts = async (req, res) => {
    const title = 'QUẢN LÝ SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin
    let formatFunction = await general.formatFunction()
    let categories = await general.getCates();
    let searchKey = req.query.searchKey
    let page = req.query.page ? req.query.page : 1
    
   

    res.status(200).render('admin/pages/product_view_admin', {
        title: title,
        admin: admin,
        formatFunction: formatFunction,
        categories: categories,
    })
}

cateAdminController.addProducts = async (req, res) => {
    const title = 'QUẢN LÝ SẢN PHẨM'
    // lấy từ khóa searchKey=?
    let admin = req.admin

    let categories = await general.getCates()
    let formatFunction = await general.formatFunction()

    res.status(200).render('admin/pages/product_view_admin', {
        title: title,
        admin: admin,
        categories: categories,
        formatFunction: formatFunction,
    })
}

// [POST] /categories_admin/delete/:id
cateAdminController.deleteCategory = async (req, res) => {
   
}

module.exports = cateAdminController