<template>
    <div class="container">
        <bs-header></bs-header>
        <bs-container>
        <div class="container" slot="bs-right">
        <el-tabs type="border-card" @tab-click="handleChangeTab" v-model="activeTab">
          <el-tab-pane label="公告列表">
            <el-table
                :data="allNotice"
                style="width: 100%">
                <el-table-column
                    label="标题"
                    width="180">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.title }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.title }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                    label="内容"
                    width="420">
                    <template slot-scope="scope">
                        <el-popover trigger="click" placement="top" width="600">
                            <p v-html="scope.row.noticeValue"></p>
                            <div slot="reference" class="name-wrapper">
                                <p>公告内容,点击产看详情</p>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            :loading="ajaxDelete"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane :label="`${activeTabLable ? '编辑公告': '添加公告'}`">
            <el-form ref="noticeForm" :model="noticeForm" label-width="80px" :rules="noticeRule">
                <el-form-item label="公告标题">
                    <el-input v-model="noticeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <div ref="editor"></div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('noticeForm')" :loading="ajaxLock">提交</el-button>
                    <el-button @click="resetForm('noticeForm')">重置</el-button>
                </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        </div>
        </bs-container>
        <bs-footer></bs-footer>
    </div>
</template>

<script>
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/center";
import bsFooter from "../../common/layout/footer";
import E from 'wangeditor'
export default {
    data () {
        const name = (rule, value, callback) => {
            if (value == "") {
                callback(new Error("公告标题不能为空"));
            } else {
                callback();
            }
        };
        return {
          editorContent: '',
          noticeForm: {
            name: '',
            content: '',
            id: ''
           },
           noticeRule: {
               name: [{ validator: name, trigger: "blur" }],
           },
           activeTab: 0,
           ajaxLock: false,
           ajaxDelete: false,
           allNotice: [],
           activeTabLable: 0,
        }
    },
    methods: {
        handleChangeTab() {
            if (this.activeTab == '0') {
                this.activeTabLable = 0;
                this.resetForm()
                this.handleGetAllNotice()
            }
        },
        handleGetAllNotice() {
            let t = this;
            t.$store.dispatch('notice/getAllNotice').then(function(res){
                if (res.type) {
                    t.$message({
                        message: res.message,
                        type: "success"
                    })
                    t.allNotice = res.data;
                } else {
                    t.$message({
                        message: res.message,
                        type: "danger"
                    })
                }
            })
        },
        submitForm(formName) {
            let t = this;
            t.$refs[formName].validate(valid => {
               t.ajaxLock = true;
                t.$store.dispatch('notice/addNotice', {
                    title: t.noticeForm.name,
                    noticeValue: t.noticeForm.content,
                    id:  t.noticeForm.id
                }).then(function(res) {
                    t.ajaxLock = false;
                    if (res.type) {
                        t.$message({
                            message: res.message,
                            type: "success"
                        })
                        t.resetForm(formName);
                    } else {
                        t.$message({
                            message: res.message,
                            type: "success"
                        })
                    }                  
                })
            })
        },
        handleEdit(index, value) {
            console.log(index, value);
            let t = this;
            let data = JSON.parse(JSON.stringify(value));
            console.log(data)
            t.noticeForm.name = data.title;
            t.noticeForm.id = data._id;
            var editor = new E(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.noticeForm.content = html
            }
            editor.create()
            editor.txt.html(data.noticeValue);
  
            t.activeTab = "1";
            t.activeTabLable = 1;
        },
        handleDelete(index, value) {
            let t = this;
            t.ajaxDelete = true;
            t.$store.dispatch('notice/deleteNoticeById', {id: value._id}).then(function(res) {
                t.ajaxDelete = false;
                if (res.type) {
                    t.$message({
                        message: res.message,
                        type: "success"
                    })
                    t.handleGetAllNotice();
                } else {
                    t.$message({
                        message: res.message,
                        type: "success"
                    })
                }                  
            })
        },
        resetForm() {
            this.noticeForm = {
                name: '',
                content: '',
                id: ''
           }
            var editor = new E(this.$refs.editor);
            editor.customConfig.onchange = (html) => {
                this.noticeForm.content = html
            }
            editor.create()
            editor.txt.html('');
        }
    },
    mounted() {
        this.handleGetAllNotice();
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.noticeForm.content = html
        }
        editor.create()
    },
    components: {
        "bs-header": bsHeader,
        "bs-container": bsContainer,
        "bs-footer": bsFooter
    }
}
</script>

<style scoped>
</style>
