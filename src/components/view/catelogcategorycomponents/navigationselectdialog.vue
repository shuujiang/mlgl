<template>
    <div class="navigationsetdialog">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="400px">
            <div style="min-height:200px;">
                <el-tree class="filter-tree" :data="treedata" :props="defaultProps" ref="tree" @node-click="handleNodeClick"></el-tree>
            </div>
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
            title: "选择导航",
            dialogVisible: false,
            treedata: [],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods: {
        //树状图点击
        handleNodeClick(val) {
            // this.currentData = this.tableData.filter(item => item.parentCode === val.value);
        }
    },
    mounted() {
        this.$bus.on(
        "navigationselectdialog",
        function(val) {
            this.dialogVisible = true;
        }.bind(this)
        );
    },
    created() {
        this.$axios.get("static/data/navigation.json").then(response => {
            const data = this.checkJSONType(response.data);
            this.treedata = data.treedata;
        });
    },
    beforeDestroy() {
        this.$bus.off("navigationselectdialog");
    }
};
</script>
<style lang="stylus">
    
</style>
