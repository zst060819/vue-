## 今日任务
    1). ajax与后台交互
    2). vuex
    3). TypeNav动态组件(部分)


## 1. 使用postman测试接口
    1). 启动 ===> 选择登陆==> cancel ===> 进入主界面
    2). 输入url/参数进行请求测试
    3). 注意post请求体参数需要指定为json格式
    4). 保存测试接口 ==> 后面可以反复使用

## 2. ajax与后台交互
    1). 对axios进行二次封装: api/ajax.js
        1. 配置通用的基础路径和超时
        2. 显示请求进度条
        3. 成功返回的数据不再是response, 而直接是响应体数据response.data
        4. 统一处理请求错误, 具体请求也可以选择处理或不处理
    2). 定义接口请求函数: api/index.js
        内部调用ajax函数
        函数的返回值是promise
    3). 调用接口请求函数发请求
        使用async/await简化promise的使用
    4). 配置代理解决跨域问题
        在vue.config.js中配置

## 3. 引入vuex并使用
    1). 下载vuex
    2). vuex的基本使用
    3). vuex多模块编程
        什么时候用? 当vuex管理的数据个数很多时
        好处: 每个功能模块的数据单独管理, 更方便, 更有扩展性
    4). vuex多模块编程的总state结构
        {
            user: {
                userInfo: {}
            },
            home: {
                baseCategoryList: []
            }
        }
    5). vuex与api交互
        异步action: 调用api接口请求函数  ==> 成功之后commit  ===> 调用mutation  ==> 更新状态数据

## 4. TypeNav组件
    1). 组件与vuex交互, 动态显示3级分类
        a. 触发异步action执行, 将数据从接口请求获取到state中: this.$store.dispatch(action)
        b. 通过mapState()/mapGetters()来将vuex中的数据读取到组件的计算属性
        c. 在模板中显示读取到的计算属性数据

    2). 控制2/3级分类列表的显示与隐藏
        @mouseenter  ==> 显示当前一级分类的2/3级分类
        @mouseleave  ==> 隐藏当前一级分类的2/3级分类
        设计一个标识当前分类下标的数据: currentIndex=-1
        当前分类的类名: :class="{item_on: currentIndex===index}"
        item_on类的样式: 背景色 / 下级列表display: block

    3). 点击某个分类项, 跳转到search路由: 
        携带query参数: /search?categoryName=电子书刊&category2Id=1
            categoryName: xxx
            category1Id: 1级分类ID / category2Id: 2级分类ID / category3Id: 3级分类ID
        解决方案一: 使用<router-link :to="{path: '/search', query: {...}}">
            问题: 效率太低(创建了太多的RouterLink组件对象, 内部绑定了太多的点击监听)  
    