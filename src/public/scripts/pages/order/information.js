let isNameValid
let isPhoneNumberValid

// Kiểm tra định dạng họ và tên
function validateName(event) {
    const vietnameseRegex = /^[a-zA-ZđĐáàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ\s]*$/g
    const name = event.currentTarget
    if (vietnameseRegex.test(name.value) == false) {
        name.nextElementSibling.textContent = 'Họ và tên chỉ bao gồm chữ hoa, chữ thường và dấu cách!'
        name.nextElementSibling.style.display = 'block'
        isNameValid = false
    } else {
        name.nextElementSibling.style.display = 'none'
        isNameValid = true
    }

    if (name.value == '') {
        name.nextElementSibling.textContent = 'Vui lòng điền họ và tên người nhận hàng!'
        name.nextElementSibling.style.display = 'block'
    }
}

// Kiểm tra định dạng số điện thoại Việt Nam
function validatePhoneNumber(event) {
    const vnPhoneNumberRegex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    const phoneNumber = event.currentTarget
    if (vnPhoneNumberRegex.test(phoneNumber.value) == false) {
        phoneNumber.nextElementSibling.textContent = 'Số điện thoại không hợp lệ!'
        phoneNumber.nextElementSibling.style.display = 'block'
        isPhoneNumberValid = false
    } else {
        phoneNumber.nextElementSibling.style.display = 'none'
        isPhoneNumberValid = true
    }

    if (phoneNumber.value == '') {
        phoneNumber.nextElementSibling.style.display = 'block'
        phoneNumber.nextElementSibling.textContent = 'Vui lòng điền số điện thoại người nhận hàng!'
    }
}

// Gửi form
const orderForm = document.querySelector('#order-form')
orderForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (isNameValid && isPhoneNumberValid == true)

        orderForm.submit()
})

// Select địa chỉ
const districtsAndWardsHNC = [
    {
        district: "Quận Ba Đình",
        wards: ["Phường Cống Vị", "Phường Điện Biên", "Phường Giảng Võ", "Phường Kim Mã", "Phường Ngọc Hà"]
    },
    {
        district: "Quận Hoàn Kiếm",
        wards: ["Phường Chương Dương", "Phường Cửa Đông", "Phường Cửa Nam", "Phường Đồng Xuân", "Phường Hàng Bài"]
    },
    {
        district: "Quận Đống Đa",
        wards: ["Phường Cát Linh", "Phường Hàng Bột", "Phường Khâm Thiên", "Phường Láng Hạ", "Phường Nam Đồng"]
    },
    {
        district: "Quận Hai Bà Trưng",
        wards: ["Phường Bạch Mai", "Phường Bách Khoa", "Phường Đồng Tâm", "Phường Minh Khai", "Phường Trương Định"]
    },
    {
        district: "Quận Thanh Xuân",
        wards: ["Phường Hạ Đình", "Phường Khương Đình", "Phường Khương Mai", "Phường Khương Trung", "Phường Nhân Chính"]
    },
    {
        district: "Quận Cầu Giấy",
        wards: ["Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Mai Dịch", "Phường Nghĩa Đô", "Phường Nghĩa Tân"]
    },
    {
        district: "Quận Hoàng Mai",
        wards: ["Phường Định Công", "Phường Giáp Bát", "Phường Hoàng Liệt", "Phường Lĩnh Nam", "Phường Tân Mai"]
    },
    {
        district: "Quận Long Biên",
        wards: ["Phường Bồ Đề", "Phường Gia Thụy", "Phường Long Biên", "Phường Ngọc Lâm", "Phường Sài Đồng"]
    },
    {
        district: "Quận Tây Hồ",
        wards: ["Phường Nhật Tân", "Phường Quảng An", "Phường Thụy Khuê", "Phường Tứ Liên", "Phường Xuân La"]
    },
    {
        district: "Quận Hà Đông",
        wards: ["Phường Biên Giang", "Phường Dương Nội", "Phường Hà Cầu", "Phường Kiến Hưng", "Phường La Khê"]
    }
]




// Xóa danh sách quận/huyện
function clearDistrict() {
    const districtInput = document.querySelector('input[list="district"')
    const options = document.querySelectorAll('#district option')

    districtInput.value = ''
    options.forEach(option => {
        option.remove()
    })
}

// Xóa danh sách phường/xã
function clearWard() {
    const wardInput = document.querySelector('input[list="ward"')
    const options = document.querySelectorAll('#ward option')

    wardInput.value = ''
    options.forEach(option => {
        option.remove()
    })
}

// Sự kiện onchange tỉnh/thành phố
function changeProvince(event) {
    clearDistrict()

    let districtDatalist = document.querySelector('#district')
    if (event.currentTarget.value == 'Hà Nội') {
        districtsAndWardsHNC.forEach(item => {
            let option = document.createElement('option')
            option.value = item.district
            districtDatalist.appendChild(option)
        })
    }  else {
        clearWard()
    }
}

// Sự kiện onchange tỉnh/thành phố
function changeDistrict(event) {
    clearWard()

    let wardDatalist = document.querySelector('#ward')
    const districtValue = document.querySelector('input[list="district"]').value
    const provinceValue = document.querySelector('input[list="province"]').value
    if (provinceValue == 'Hà Nội') {
        districtsAndWardsHNC.find(ele => ele.district == districtValue).wards.forEach(ward => {
            let option = document.createElement('option')
            option.value = ward
            wardDatalist.appendChild(option)
        })
    }
}

function submitOrderForm(event) {
    event.preventDefault()
    const orderForm = document.querySelector('#order-form')
    fetchOrderPost()
}

const toCurrency = function (money) {
    let currency = money.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "," && (a.length - i) % 3 === 0 ? "." + c : c
    })
    return currency + 'đ'
}

// fetch data
let cartData = localStorage.getItem('formDataArray')

let cartDataString = JSON.parse(cartData)

if (cartDataString.length) {
    let orderProductContent = document.querySelector('.order-product__content')

    cartDataString.forEach(product => {
        let elementHidden = document.createElement('div')

        fetch(`/general/product_variant_info?product_variant_id=${product.product_variant_id}`)
            .then(res => res.json())
            .then(data => {
                let productId = data.productVariantInfo[0].product_id ?? 'null'
                let productAvtImg = data.productVariantInfo[0].product_avt_img ?? 'null'
                let productName = data.productVariantInfo[0].product_name ?? 'null'
                let productVariantName = data.productVariantInfo[0].product_variant_name ?? 'null'
                let productQuantity = product.order_detail_quantity
                let productDiscount = data.productVariantInfo[0].discount_amount
                let productVariantPrice = data.productVariantInfo[0].product_variant_price

                elementHidden.classList.add('product', 'mobile-hidden')
                elementHidden.innerHTML = `
                    <div class="product__view order-product__col-big">
                        <img src="/imgs/product_image/P${productId}/${productAvtImg}" alt="${productName}">
                        <p>${productName}</p>
                    </div>

                    <div class="order-product__col">
                        <p>${productVariantName}</p>
                    </div>

                    <div class="order-product__col">
                        <del class="product__unit-price-del">${productDiscount ? toCurrency(productVariantPrice) : ''}</del>    
                        <p class="product__unit-price">${toCurrency(productVariantPrice - parseInt(productVariantPrice * productDiscount / 100))}</p>
                    </div>

                    <div class="order-product__col">
                        <p class="product__quantity">${productQuantity}</p>
                    </div>

                    <div class="product__price order-product__col">
                        <p>${toCurrency(productQuantity * (productVariantPrice - parseInt(productVariantPrice * productDiscount / 100)))}</p>
                    </div>
                    `

                let elementDisplay = document.createElement('div')
                elementDisplay.classList.add('product', 'mobile-display')
                elementDisplay.innerHTML = `
                    <img src="/imgs/product_image/P${productId}/${productAvtImg}" alt="${productName}">
                    <div class="product__content">
                        <p class="product__name">${productName}</p>
                        <p class="product__variant">Phân loại: ${productVariantName}</p>
                        <div>
                            <p class="product__unit-price"><del class="product__unit-price-del">${productDiscount ? toCurrency(productVariantPrice) : ''}</del>${toCurrency(productVariantPrice - parseInt(productVariantPrice * productDiscount / 100))}</p>
                            <p>Số lượng: <span class="product__quantity">${productQuantity}</span></p>
                        </div>
                    </div>
                    `

                orderProductContent.appendChild(elementHidden)
                orderProductContent.appendChild(elementDisplay)
            })
            .then(() => {
                // calc total price
                const orderPayDel = document.querySelector('.order-pay__total-del')
                const orderPay = document.querySelector('.order-pay__total')
                let orderProduct

                if (window.innerWidth == 416)
                    orderProduct = document.querySelectorAll('.product.mobile-display')
                else
                    orderProduct = document.querySelectorAll('.product.mobile-hidden')

                let totalOrderPayDel = 0
                let totalOrderPay = 0
                orderProduct.forEach(product => {
                    let delEle = product.querySelector('del').textContent

                    if (delEle)
                        totalOrderPayDel += Number(product.querySelector('.product__quantity').textContent) * Number(delEle.slice(0, -1).replaceAll('.', ''))
                    else
                        totalOrderPayDel += Number(product.querySelector('.product__quantity').textContent) * Number(product.querySelector('.product__unit-price').textContent.slice(0, -1).replaceAll('.', ''))

                    totalOrderPay += Number(product.querySelector('.product__quantity').textContent) * Number(product.querySelector('.product__unit-price').textContent.slice(0, -1).replaceAll('.', ''))
                })

                if (totalOrderPayDel != totalOrderPay)
                    orderPayDel.innerHTML = toCurrency(totalOrderPayDel)
                orderPay.innerHTML = toCurrency(totalOrderPay)
            })
    })
}

// fetch POST to payment

const fetchOrderPost = function () {
    const order_name = document.querySelector('input[name="buyerName"]').value
    const order_phone = document.querySelector('input[name="buyerPhone"]').value
    const order_province = document.querySelector('input[name="province"]').value
    const order_district = document.querySelector('input[name="district"]').value
    const order_ward = document.querySelector('input[name="ward"]').value
    const order_address = document.querySelector('input[name="address"]').value
    const order_note = document.querySelector('textarea[name="note"]').value
    // const buyerAddress = document.querySelector('input[name="address"]').value
    const paying_method_id = getSelectedValue()

    const orderInfo = {
        order_name: order_name,
        order_phone: order_phone,
        order_delivery_address: order_address + ' ' + order_ward + ' ' + order_district + ' ' + order_province,
        order_note: order_note,
        paying_method_id: paying_method_id,
    }

    const orderInformation = {
        orderInfo: orderInfo,
        orderDetails: cartDataString,
    }

    fetch('/order/information', {
        method: 'POST',
        body: JSON.stringify(orderInformation),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(back => {
            if (back.status === 'error') {
                window.alert('Vui lòng thử lại sau')
            } else if (back.status === 'success') {
                window.location.href = `http://localhost:3000/order/payment?paying_method_id=${back.paying_method_id}&order_id=${back.order_id}`
            }
        })
}

function getSelectedValue() {
    var radioButtons = document.getElementsByName('pay-method')

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            var selectedValue = radioButtons[i].value;
            return selectedValue;
        }
    }
}