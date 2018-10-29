<template>
    <div class="navigationsetdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="800px">
            <ul class="setResource">
                <li class="category">
                    <p>所有类目：</p>
                    <el-tree class="filter-tree" :data="treedata" :props="defaultProps" ref="tree" @node-click="handleNodeClick"></el-tree>
                </li>
                <li class="resources">
                    <p>待选资源：</p>
                    <ul class="selected">
                        <li v-for="item in resourcesList" @click="seleResourcesFun(item)">
                            <span>{{item.directoryName}}</span>
                        </li>
                    </ul>
                </li>
                <li class="resources">
                    <p>已选资源：</p>
                    <ul>
                        <li v-for="item in seleResourcesList">
                            <span>{{item.directoryName}}</span>
                        </li>
                    </ul>   
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <span><el-button @click="dialogVisible = false">关 闭</el-button></span>
                <span><el-button type="primary" @click="dialogVisible = false">保 存</el-button></span>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
        title: "导航资源设置",
        dialogVisible: false,
        treedata:[],
        filterText: "",
        defaultProps: {
            children: "children",
            label: "label"
        },
        tableData: [],
        currentData:[],
        resourcesList:[],
        seleResourcesList: []
    };
  },
    methods: {
        seleResourcesFun(val){
            console.log(val)
            var aa = true;
            var seleResourcesList = this.seleResourcesList;
            seleResourcesList.forEach(element => {
                if(element.directoryCode == val.directoryCode){
                    aa =false;
                }
            });
            if(aa){
                seleResourcesList.push(val);
                this.seleResourcesList = seleResourcesList;
            }
        },
        //树状图点击
		handleNodeClick(val) {
			console.log(val, 107)
			this.editorObj = val;
			// this.currentData = this.tableData.filter(item => item.superiorNgCode === val.value);
		},
    },
    mounted() {
        this.$bus.on(
            "navigationsetdialog",
            function(val) {
                this.dialogVisible = true;
            }.bind(this)
        );
    },
    created() {
		this.$axios.get("static/data/catelogcategory.json").then(response => {
			const data = this.checkJSONType(response.data);
			this.treedata = data.treedata;
        });
        this.$axios.get("static/data/cateloglist.json").then(response => {
			const data = this.checkJSONType(response.data);
			this.resourcesList = data.tableData;
		});
	},
    beforeDestroy() {
        this.$bus.off("navigationsetdialog");
    }
};
</script>
<style lang="stylus">
    .setResource
        overflow hidden
        .category
            width 30%
        .resources
            width 35%
            p
                text-align center  
            ul
                width 100%
                overflow hidden
                border-left 1px solid #aaa
                height 400px            
                li
                    width 100%
                    text-align center
            .selected
                li
                    cursor pointer
        li
            float left
            overflow hidden
            p
                font-size 16px
                line-height 50px
</style>
