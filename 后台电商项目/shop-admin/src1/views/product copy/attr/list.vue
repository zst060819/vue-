<template>
  <div>
    <!--第一个卡片-->
    <el-card>
      <CategorySelector @changeCategory="changeCategory" ref="cs" />
    </el-card>
    <!--第二个卡片-->
    <el-card style="margin-top:20px;">
      <!--展示平台属性列表的界面-->
      <div v-show="isShowUpdateAttr">
        <!--按钮-->
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom:20px"
          @click="showAddAttr"
          :disabled="!category3Id"
        >添加属性</el-button>
        <!--表格-->
        <el-table :data="attrList" stripe style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column prop="attrValueList" label="属性值列表">
            <template slot-scope="{row,$index}">
              <el-tag
                type="info"
                v-for="(item,index) in row.attrValueList"
                :key="item.id"
              >{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{row,$index}">
               <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdateAttr(row)"
              /> 
              <!--气泡对话框-->
              <el-popconfirm :title="`确定要删除 ${row.attrName} 吗?`" @onConfirm="deleteAttr(row.id)">
                <HintButton
                  title="删除"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--修改平台属性的界面-->
      <div v-show="!isShowUpdateAttr">
        <!--表单内容-->
        <el-form inline :model="formAttr">
          <el-form-item label="属性名">
            <el-input v-model="formAttr.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <!--两个按钮-->
        <div style="margin-bottom:20px">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addValue"
            :disabled="!formAttr.attrName.trim()"
          >添加属性值</el-button>
          <el-button @click="isShowUpdateAttr=true">取消</el-button>
        </div>
        <!--表格-->
        <el-table :data="formAttr.attrValueList" style="width: 100%;margin-bottom:20px;" border>
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="valueName" label="属性值名称">
            <template slot-scope="{row,$index}">
              <!--编辑模式-->
              <el-input
                :ref="$index"
                type="text"
                size="mini"
                v-model="row.valueName"
                placeholder="请输入名称"
                v-if="row.edit"
                @keyup.enter.native="toView(row)"
                @blur="toView(row)"
              ></el-input>
              <!--查看模式-->
              <span
                v-else
                @click="toEdit(row)"
                style="display:inline-block;width:100%"
              >{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <!--气泡对话框-->
              <el-popconfirm :title="`确定要删除 ${row.valueName} 吗?`" @onConfirm="deleteValue($index)">
                <HintButton
                  title="删除"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!--两个按钮-->
        <el-button type="primary" @click="updateAttr" :disabled="!isSaveValid">保存</el-button>
        <el-button @click="isShowUpdateAttr=true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入lodash
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "AttrList",
  data() {
    return {
      category1Id: "", //储存分类ID
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowUpdateAttr: true,
      formAttr: {
        attrName: "",
        attrValueList: [],
      },
    };
  },
  computed: {
    isSaveValid() {
      return (
        this.formAttr.attrName.trim() &&
        this.formAttr.attrValueList.some((item) => !!item.valueName.trim())
      );
    },
  },
  watch: {
    isShowUpdateAttr(val) {
      this.$refs.cs.isDisabled = !val
    }
  },
  methods: {
    //获取平台属性数据
    async getAttrList() {
      const result = await this.$API.attr.getAttrInfoList(
        this.category1Id,
        this.category2Id,
        this.category3Id
      );
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
    //参数1:传过来的Id, 参数2:级别的标识
    changeCategory({ categoryId, level }) {
      if (level === 3) {
        this.category3Id = categoryId;
        this.getAttrList();
      } else if (level === 1) {
        this.category1Id = categoryId;
        //重置数据
        this.category2Id = null;
        this.attrList = [];
      } else if (level === 2) {
        this.category2Id = categoryId;
        //重置数据
        this.category3Id = null;
        this.attrList = [];
      }
    },
    //点击修改按钮,展示修改平台属性界面
    showUpdateAttr(attrInfo) {
      this.isShowUpdateAttr = false;
      this.formAttr = cloneDeep(attrInfo);
    },
    //点击删除按钮,从属性值列表数组中移出某个属性值对象
    deleteValue(index) {
      this.formAttr.attrValueList.splice(index, 1);
    },
    //点击添加属性值按钮 添加对象
    addValue() {
      //添加一个属性值
      this.formAttr.attrValueList.push({
        valueName: "",
        attrId: this.formAttr.id,
        edit: true, //标识,用来区分是查看模式还是编辑模式
      });
      // 报错:原因:此时是向数组中添加一个对象,HTML结构中还没有出现这个文本框呢,我们就直接获取文本框让其获取光标
      this.$nextTick(() => {
        this.$refs[this.formAttr.attrValueList.length - 1].focus();
      });
    },
    //进入查看模式
    toView(value) {
      if (value.valueName) {
        value.edit = false;
      }
    },
    //进入编辑模式
    toEdit(value) {
      // 判断当前的这个属性值对象中是否有这个edit的属性,如果没有则添加,否则直接修改
      if (!value.hasOwnProperty("edit")) {
        this.$set(value, "edit", true);
      } else {
        value.edit = true;
      }
    },
    //点击保存按钮,实现平台属性更新
    async updateAttr() {
      this.formAttr.attrValueList = this.formAttr.attrValueList.filter(
        (item) => {
          //干掉标识数据
          delete item.edit;
          //返回不为空的数据
          return !!item.valueName.trim();
        }
      );
      //调用接口
      const result = await this.$API.attr.saveAttrInfo(this.formAttr);
      //提示信息
      if (result.code === 200) {
        this.$message.success(
          `${this.formAttr.id ? "修改" : "删除"}平台属性成功`
        );
        this.getAttrList();
        //关闭当前页面
        this.isShowUpdateAttr = true;
      } else {
        this.$message.error(
          `${this.formAttr.id ? "修改" : "删除"}平台属性失败`
        );
      }
    },
    //添加平台属性按钮事件
    showAddAttr() {
      this.isShowUpdateAttr = false;
      this.formAttr = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
    },
    //点击删除按钮,删除某个平台属性数据
    async deleteAttr(id) {
      //调用接口
      const result = await this.$API.attr.deleteAttrInfoById(id);
      //提示信息
      if (result.code === 200) {
        this.$message.success("删除成功");
        this.getAttrList();
      } else {
        this.$message.error("删除失败了");
      }
    },
  },
};
</script>
<style >
</style>