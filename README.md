# TWOOL

Twool.js is an Unexpected Javascript Tool.

It contains tools to manage **files**, **images**, **IndexDB**, which will make you manage your data on browser quicker and easier.

You can also use the extention **twool.safe.js**, which makes encrypt(with RSA) much easier.

### Files

1. You can input different types of file (with an `<input type="file"></input>`). Most of them will be stored as **Blob**, which is easy to upload to server.

2. You can download the file in **Blob** / **string** / **json** format.

3. If you input a file with the suffix of **.txt** / **.json** , they will be able to parse in to **string** or **object**.

4. All the files can be saved in **IndexDB**.

### Images

1. With the tool, you can convert the image in to **base64** / **Blob** / **DOM_Image_Object** , which is easy to use.

2. Any types of image can be stored in **IndexDB**.

### IndexDB

1. You can store any file in the database.

2. **Twool** support the **version** manager of the database.

****

# API

该库中出现的方法均为 async ,确保你的浏览器支持es6

## 数据库 (IndexDB)

### 1. <*Object*> **tw.db** ( <*string*> name )
    获取名为 name 的数据库, 并返回一个含有数据库有关所有工具的对象

### 2. <*Object*> **tw.db.createTable** ( <*string*> name , <*string*> main_key ( default: "key" ) )
    创建名为 name 的表, 并将 main_key 设为该表的主键(默认为 "key"), 返回其 tw.db.table 对象

### 3. <*Object*> **tw.db.table** ( <*string*> name )
    打开名为 name 的表,并返回一个含有操作该 table 所有工具的对象
> ### 包含的工具
> ### 1. <*Object*> **tw.db.table.add** ( <*Object*> data )
> 将 data (类型为 Object , 并且包含主键) 存入该 table , 并返回其 tw.db.table 对象
> ### 2. <*Object*> **tw.db.table.put** ( <*Object*> data )
> 将主键值对应的数据 ( 主键值包含于 data ) 修改为 data , 并返回其 tw.db.table 对象
> ### 3. <*Object*> **tw.db.table.get** ( <*String*> key )
> 通过主键值 key 寻找数据, 并返回数据
> ### 4. <*Object*> **tw.db.table.find** ( <*String*> key_name , <*String*> value )
> 通过引索 key_name 寻找值为 value 的数据, 并返回数据
> ### 5. <*Object*> **tw.db.table.cursor** ( <*Function*> func )
> 循环执行 func ( data [ i ] ) 直到 table 中所有数据被遍历或者 **func** 返回值为 false . 返回其 tw.db.table 对象
> ### 6. <*Object*> **tw.db.table.del** ( <*String*> main_key )
> 删除主键值 main_key 对应的数据 , 并返回其 tw.db.table 对象

### 4. <*Object*> **tw.db.close** ( <*string*> name )
    关闭数据库