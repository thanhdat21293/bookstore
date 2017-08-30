# Dự án Book Store

Bước 1: Tạo CSDL

Bước 2: Crawl dữ liệu theo CSDL

Bước 3: Tạo web sử dụng Express, Nunjucks, PostgreSQL. Nếu chưa có dữ liệu trong database thì tự thêm 3-4 cái để test thử.

Bước 4: Nâng cấp lên Vuejs + GraphQL (Bước này chưa cần quan tâm)

# Node_modules đã cài

```
npm i --save pg-promise bluebird express nunjucks body-parser nightmare
```

# Chung

1. Mọi người nên tham khảo các dự án Nunjucks khác.

2. Cấu hình cho phần CSDL:

- Tên database: **bookstore**

3. Khi làm gì thì nên thảo luận nhóm để đỡ phải đập đi làm lại

# Chú ý:

- CSDL: Mọi người xem nếu có gì phản hồi ở SLack nhé. 

- Crawl: Người Crawl khi crawling mà thấy có gì bất ổn thì báo mọi người để mọi người xem lại và sửa.

- Express: 

    + Chia router vào folder, tạo file đúng tên để nhìn tên file là biết có chức năng gì
    
    + Folder models để truy vấn CSDL
