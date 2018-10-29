<template>
	<div class="catelogcategory innercontent">
		<div class="lefttree">
			<el-input placeholder="输入关键字过滤" v-model="filterText"></el-input>
			<el-tree class="filter-tree" :data="treedata" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick"></el-tree>
		</div>
		<div class="rightcontentbox">
			<div class="formAction">
				<div class="tableformitem">
					<span class="tableformitemlebel">类目名称：</span>
					<div class="tableformitemInput">
						<el-input placeholder="请输入类目名称" style="width:100%;" v-model="name"></el-input>
					</div>
				</div>
				<div class="tableformitem">
					<span class="tableformitemlebel">类目代码：</span>
					<div  class="tableformitemInput">
						<el-input placeholder="请输入类目代码"  style="width:100%;" v-model="code"></el-input>
					</div>
				</div>
			</div>
			<div class="formAction">
				<div class="actionButtons">
					<el-button type="primary">查询</el-button>
				</div>
				<div class="actionButtons">
					<el-button type="primary" @click="showDialog(0, '', '')">新增</el-button>
				</div>
				<div class="actionButtons">
					<el-button type="primary">批量删除</el-button>
				</div>
				<div class="actionButtons">
					<el-button type="primary">导出</el-button>
				</div>
			</div>
			<el-table :data="currentData" border @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="categoryName" label="名称"></el-table-column>
				<el-table-column prop="categoryCode" label="编码"></el-table-column>
				<el-table-column prop="parentName" label="上级类目"></el-table-column>
				<el-table-column prop="entryPerson" label="录入人"></el-table-column>
				<el-table-column prop="entryTime" label="时间"></el-table-column>
				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button size="small" type="primary" @click="showDialog(1,scope.$index, scope.row)">查看</el-button>
						<el-button size="small" type="primary" @click="showDialog(2,scope.$index, scope.row)">修改</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="paging">
				<el-pagination :current-page="pagenumber" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="count" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</div>
		<catelogcategory-dialog></catelogcategory-dialog>
	</div>
</template>
<script>
import CatelogcategoryDialog from "../catelogcategorycomponents/catelogcategorydialog"
export default {
	components:{
		CatelogcategoryDialog
	},
	data() {
		return {
			name: "",
			code: "",
			filterText: "",
			treedata: [],
			defaultProps: {
				children: "children",
				label: "label"
			},
			tableData: [],
			currentData:[],
			pagenumber:1,
			pagesize:10,
			count:100
		};
	},
	methods: {
		//树状图过滤器
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		},
		//树状图点击
		handleNodeClick(val) {
			this.currentData = this.tableData.filter(item => item.parentCode === val.value);
		},
		//表格选择
		handleSelectionChange(val) {
			console.log(val);
		},
		//弹框
		showDialog(flag, index, obj) {
			this.$bus.emit("catelogcategorydialog",{flag: flag, index: index, obj: obj});
		},
		//删除一条信息
		handleDelete(index, obj) {
			this.$confirm("是否删除该条信息?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.tableData.splice(index, 1);
				this.$message({
						type: "warning",
						message: "删除成功!"
					});
				}).catch(() => {
				this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
		},
		handleCurrentChange(val) {
			this.pagenumber = val;
		}
	},
	created() {
		this.$axios.get("static/data/catelogcategory.json").then(response => {
			const data = this.checkJSONType(response.data);
			this.treedata = data.treedata;
			this.tableData = data.tableData;
			this.currentData = this.tableData;
		});
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	}
};
</script>
<style>

</style>

