const { promisify } = require("util")
const index = require("../../models/customer/index.model")
const order = require("../../models/customer/order.model")
const general = require("../../models/general.model")
const account = require("../../models/customer/account.model")
const nodeMailer = require("nodemailer")
const { log } = require("console")

const orderController = () => { }

// [POST] /order/addCart
orderController.addCart = async (req, res) => {
	let customer_id = 0

	if (req.user) {
		customer_id = req.user.customer_id
	} else {
		return res.status(401).json({
			status: "NotAuth",
		})
	}

	let product_variant_id = req.body.product_variant_id
	let cart_quantity = req.body.cart_quantity

	let result = await order.addCart(
		customer_id,
		product_variant_id,
		cart_quantity
	)

	if (result) {
		return res.json({
			status: "success",
		})
	} else {
		return res.json({
			status: "error",
		})
	}
}

// [GET] /order/cart
orderController.cart = async (req, res) => {
	customer_id = req.user.customer_id
	let header_user = await index.header_user(req)
	let header = await index.header(req)
	let detailCart = await order.getDetailCart(customer_id)
	let formatFunction = await general.formatFunction()

	res.render("./pages/order/cart", {
		header: header,
		user: header_user,
		detailCart: detailCart,
		formatFunction: formatFunction,
	})
}

// [POST] /order/cart/delete
orderController.deleteCart = async (req, res) => {
	let customer_id = req.user.customer_id
	let productsCartDelete = req.body

	order.deleteCart(customer_id, productsCartDelete, function (err, success) {
		if (success) {
			return res.status(200).json({
				status: "success",
			})
		} else {
			return res.status(404).json({
				status: "error",
			})
		}
	})
}

// [POST] /order/cart/update
orderController.updateCart = async (req, res) => {
	let customer_id = req.user.customer_id
	let productsCartUpdate = req.body.productsCartUpdate
	let productsCartUpdateOld = req.body.productsCartUpdateOld

	await order.deleteCart(customer_id, productsCartUpdate, function (err, success) { })
	await order.deleteCart(customer_id, productsCartUpdateOld, function (err, success) { })

	await order.updateCart(customer_id, productsCartUpdate, function (err, success) {
		if (success) {
			return res.status(200).json({
				status: "success",
			})
		} else {
			return res.status(404).json({
				status: "error",
			})
		}
	})
}

// [GET] /order/information
orderController.information = async (req, res) => {
	let header_user = await index.header_user(req)
	let header = await index.header(req)
	let formatFunction = await general.formatFunction()

	res.render("./pages/order/information", {
		header: header,
		user: header_user,
		formatFunction: formatFunction,
	})
}

// [POST] /order/information
orderController.informationPost = async (req, res) => {
	let orderInformation = req.body

	let customer_id = req.user.customer_id
	let orderInfo = orderInformation.orderInfo
	let orderDetails = orderInformation.orderDetails

	order.insertOrder(
		customer_id,
		orderInfo,
		orderDetails,
		function (err, success, order_id, paying_method_id) {
			if (err) {
				return res.status(404).json({
					status: "error",
				})
			} else if (success) {
				order.deleteCart(customer_id, orderDetails, function (err, success) { })
				var transporter = nodeMailer.createTransport({
					host: "smtp.gmail.com",
					port: 465,
					secure: true,
					auth: {
					  user: "dvtrieu03@gmail.com",
					  pass: "ilumvqutexayuoah",
					},
				  });
			  
				  const html = `<h2>Xin chào, Chu Tuan Manh</h2><br/> +
								<p>Đơn hàng của bạn đã được thanh toán thành công.</p><br/> +
								<p>Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi.</p><br/> +
								<p>Hãy kiểm tra email thường xuyên để nhận thông tin đơn hàng và thông tin khuyến mãi nhé!</p>`;
			  
				  var mailOptions = {
					from: "Model Shop <dvtrieu03@gmail.com>",
					to: "chutuanmanh2003@gmail.com",
					subject: "XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG",
					html: html,
				  };
			  
				  const info = transporter.sendMail(mailOptions);
				  console.log(info);
				  
				res.status(200).json({
					status: "success",
					order_id: order_id,
					paying_method_id: orderInfo.paying_method_id,
				})
			}
		}
	)
}

// [GET] /order/payment?paying_method_id=x&order_id=y
orderController.payment = async (req, res) => {
	let paying_method_id = req.query.paying_method_id
	let order_id = req.query.order_id

	let customer_id = req.user.customer_id
	let header_user = await index.header_user(req)
	let header = await index.header(req)
	let formatFunction = await general.formatFunction()

	let purchase = await account.getPurchaseHistory(customer_id, 0, order_id)

	if (paying_method_id == 1) {
		res.render("./pages/order/momo", {
			header: header,
			user: header_user,
			formatFunction: formatFunction,
			purchase: purchase[0],
		})
	} else if (paying_method_id == 2) {
		res.render("./pages/order/atm", {
			header: header,
			user: header_user,
			formatFunction: formatFunction,
			purchase: purchase[0],
		})
	} else if (paying_method_id == 3) {
		res.render("./pages/order/credit", {
			header: header,
			user: header_user,
			formatFunction: formatFunction,
			purchase: purchase[0],
		})
	}
}

orderController.cancelOrder = async (req, res) => {
	let order_id = req.body.order_id;

	await order.updateCancelOrder(order_id, function (err, success) {
		if (err) {
			res.status(404).json({
				status: 'error',
			})
		} else {
			res.status(200).json({
				status: 'success',
			})
		}
	})
}

module.exports = orderController
