const general = require('../../models/general.model')
const cate = require('../../models/admin/cateAdmin.model')
const db = require('../../config/db/connect')
const cateAdminController = () => { }
const multer = require('multer');
const path = require('path');

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

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/imgs/categories')); // Lưu file vào thư mục này
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Giữ nguyên tên file gốc
    }
});

const upload = multer({ storage: storage }).single('file'); // 'file' là tên field trong form

cateAdminController.addCategories = async (req, res) => {
    console.log('category');
    const title = 'QUẢN LÝ DANH MỤC SẢN PHẨM';
    let admin = req.admin;

    // Xử lý upload file
    upload(req, res, (err) => {
        if (err) {
            console.error('Lỗi khi upload file:', err);
            return res.status(500).send('Upload file thất bại');
        }
        console.log('Saving to:', path.join(__dirname, '../../public/imgs/categories'));

        const categoryName = req.body.productName;
        const filePath = req.file ? `/imgs/categories/${req.file}` : null; // Đường dẫn file

        console.log('File đã upload:', req.file);
        console.log('Tên danh mục:', categoryName);

        if (!categoryName || !filePath) {
            return res.status(400).send('Tên danh mục và file là bắt buộc');
        }

        // Lưu thông tin vào database
        db.query(
            'INSERT INTO categories (category_name, category_img) VALUES (?, ?)',
            [categoryName, req.file.filename],
            (err, results) => {
                if (err) {
                    console.error('Lỗi database:', err);
                    return res.status(500).send('Lỗi khi thao tác cơ sở dữ liệu');
                } else {
                    console.log('Kết quả từ database:', results);

                    // Render lại trang
                    general.formatFunction().then((formatFunction) => {
                        res.status(200).render('admin/pages/cate_view_admin', {
                            title: title,
                            admin: admin,
                            formatFunction: formatFunction,
                        });
                    }).catch(formatErr => {
                        console.error('Lỗi trong formatFunction:', formatErr);
                        res.status(500).send('Lỗi nội bộ');
                    });
                }
            }
        );
    });
};

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

cateAdminController.deleteProducts  = async (req,res) =>{
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE product_id = ?', [req.body.product_id], (err, results) => {
            if (err) {
                console.log(err);
                resolve(resut);
            }
            resolve(1)
        })
    })
}

// [POST] /categories_admin/delete/:id
cateAdminController.deleteCategory = async (req, res) => {
   
}


module.exports = cateAdminController