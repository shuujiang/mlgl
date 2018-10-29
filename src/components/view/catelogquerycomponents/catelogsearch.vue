<template>
  	<div class="catelogsearch innercontent">
		<p :class="{searchTitle:true,searchTitle1:show}"><span>数据资源目录检索</span></p>
		<div class="searchContent">
			<div :class="{search:true, search1:show}">
				<div class="searchInput"><el-input placeholder="请输入内容" v-model="search"></el-input></div>
				<div class="searchbotton" @click="searchFun">
					<i class="searchIcon"></i>
					<span>搜 索</span>
				</div>
			</div>
			<div :class="{resultsContent:true, determine: show}">
				<div class="directoryNavigation">
					<div class="lefttree">
						<el-tree class="filter-tree" :data="treedata" :props="defaultProps" :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick"></el-tree>
					</div>
					<div class="ngselected">
						<div class="ngselectedtitle"><span>已选</span><i></i></div>
						<div class="ngselectedcontent">
							<el-tag  v-for="tag in tags" :key="tag.name" closable >{{tag.superiorNgName}}: {{tag.navigationName}}</el-tag>						
						</div>	
					</div>
					<ul>
						<li class="Ngshow" v-for="(item,i) in NGlist" :key="i">
							<div class="Ngname">{{item.navigationName}}：</div>
							<div :class="{Ngcontent:true, Ngcontent1: !item.animation}">
								<span v-for="(aitem,i) in item.children" :key="i" @click="ngtagaddFun(aitem)">{{aitem.navigationName}}</span>
							</div>
							<div class="Ngmore" @click="NgmoreFun(i)">
								<span>{{item.label}}</span>
								<i :class="{moreIcon: item.animation, moreIcon1: item.animation1}"></i>
							</div>
						</li>
					</ul>
					<ul class="resourcestab">
						<li :class="{selectLi:updateTime}" @click='tabsChange("updateTime")'>更新时间</li>
						<li :class="{selectLi:institutions}" @click='tabsChange("institutions")'>机构排序</li>
						<li :class="{selectLi:theme}" @click='tabsChange("theme")'>主题排序</li>
					</ul>
					<ul class="resourcescontent">
						<li v-for="item in resultsList" :key="item.instructions">
							<div class="left"></div>
							<div class="right">
								<p class="name">{{item.directoryName}}</p>
								<p class="details">{{item.instructions}}</p>
								<p class="source">
									<span class="department">{{item.departmentName}}</span>
									<span>{{item.entryTime}}</span>
								</p>
							</div>
						</li>
					</ul>
					<div class="paging">
						<el-pagination :current-page="pagenumber" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="count" @current-change="handleCurrentChange"></el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				search: "",
				show: true,
				filterText: "",
				treedata: [],
				defaultProps: {
					children: "children",
					label: "label"
				},
				tableData:[],
				currentData:[],
				NGlist:[],
				tags:[],
				resultsList:[],
				updateTime:true,
				institutions:false,
				theme:false,
				pagenumber:1,
				pagesize:10,
				count:100
			};
		},
		methods: {
			//树状图过滤器
			filterNode(value, data) {
				if (!value) return true;
				console.log(data)
				return data.label.indexOf(value) !== -1;
			},
			//树状图点击
			handleNodeClick(val) {
				this.currentData = this.tableData.filter(item => item.parentCode === val.value);
			},
			searchFun(){
				if(this.search){
					this.show = false;
				}else{
					this.show = true;
				}
			},
			NgmoreFun(i){
				var NGlist = this.NGlist;
				NGlist[i].animation = !NGlist[i].animation;
				NGlist[i].animation1 = !NGlist[i].animation;
				this.NGlist = NGlist;
				if(NGlist[i].animation){
					NGlist[i].label = "收起";
				}else{
					NGlist[i].label = "更多";
				}
				this.$forceUpdate()
			},
			ngtagaddFun(val){
				this.tags.push(val);
			},
			tabsChange(type){
				this.updateTime=false;
				this.institutions=false;
				this.theme=false;
				this[type] = true;
			},
			handleCurrentChange(val) {
				this.pagenumber = val;
			}
		},
		created() {
			this.$axios.get("static/data/navigation.json").then(response => {
				const data = this.checkJSONType(response.data);
				this.treedata = data.treedata;
				this.tableData = data.tableData;
				this.currentData = this.tableData;
				this.NGlist = this.tableData.filter(item => item.superiorNgCode === "LM")
				this.NGlist.forEach(element => {
					element.label = "更多";
					element.animation = false;
					element.animation1 = false;
					element.children = this.tableData.filter(item => item.superiorNgCode === element.navigationCode)
				});
			});
			this.$axios.get("static/data/navigationList.json").then(response => {
				const data = this.checkJSONType(response.data);
				this.resultsList = data.tableData;
			});
		},
		watch: {
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		mounted() {
			if(this.$route.query.info) {
				this.show = false;
			}else{
				this.show = true;
			}
		}
	};
</script>
<style lang="stylus">
	.catelogsearch
		.searchTitle
			font-size 34px
			font-weight bold
			text-align center
			color #428ced
			background-color color
		.searchTitle1
			margin-top 200px
		.searchContent
			margin-top 10px
			min-width 1100px
			.search
				margin 0 auto
				width 740px
				height 40px
				border-radius 5px
				overflow hidden
				.searchbotton
					float left
					overflow hidden
					.searchIcon
						float left
						width 40px
						height 40px
						background url(../../../../static/img/search.png) no-repeat 50% 50%/ 60%
						background-color #409EFF
					span
						cursor pointer
						float left
						width 60px
						height 40px
						color #fff
						font-size 20px
						line-height 40px
						background-color #409EFF
				.searchInput
					float left
					width 640px
					height 40px
					input
						border-radius 5px 0 0 5px
						height 40px
			.search1
				margin-top 50px
			.resultsContent
				position relative	
				.directoryNavigation
					position relative
					margin auto
					width 740px
					font-size 12px
					.lefttree
						position absolute
						right 780px
						width 30%
						min-height 400px
						overflow hidden	
					.ngselected
						line-height 36px
						color #707070
						overflow hidden
						.ngselectedtitle
							float left
							overflow hidden
							width 60px
							height 100%
							span 
								float left
								height 100%
							i 
								float left
								width 20px
								height 36px
								background url(../../../../static/img/ngseachdown.png) no-repeat 50% 50%
								transform rotate(-90deg) 
						.ngselectedcontent
							float left
							overflow hidden
							width 680px
							line-height 36px
							.el-tag
								margin-right 5px
								color #707070
								background-color #ffffff
								border-color #dedede
								height 26px
								line-height 26px
								.el-icon-close
									color #707070
									&:hover
										background-color #dedede
										color #ffffff
					.Ngshow
						border-top 1px dashed #dedede
						overflow hidden
						line-height 36px
						.Ngname
							float left
							width 100px
							height 36px
							color #428ced
						.Ngcontent
							float left
							width 580px
							span
								cursor pointer
								float left
								padding 0 20px
								color #313131
								&:hover
									color #428ced
						.Ngcontent1
							height 36px
						.Ngmore
							float left
							width 60px
							height 36px
							color #707070
							cursor pointer
							span 
								float left
								width 40px
								height 100%
							i 
								float left
								width 20px
								height 100%
								background url(../../../../static/img/ngseachdown.png) no-repeat 50% 50%
							.moreIcon
								transform rotate(180deg) 
								animation asdasd 0.3s linear 0s 1
							@keyframes asdasd
								0%
									transform rotate(0deg)
								20%
									transform rotate(45deg) 
								40%
									transform rotate(90deg) 
								60%
									transform rotate(135deg) 
								100%
									transform rotate(180deg)
							.moreIcon1
								transform rotate(0deg) 
								animation asdasd1 0.3s linear 0s 1
							@keyframes asdasd1
								0%
									transform rotate(180deg)
								20%
									transform rotate(135deg) 
								40%
									transform rotate(90deg) 
								60%
									transform rotate(45deg) 
								100%
									transform rotate(0deg) 
					.resourcestab
						width 100%
						height 40px
						margin-top 10px
						background-color #f5f5f5
						border 1px solid #dedede
						li
							float left
							width 100px
							height 100%
							line-height 40px
							text-align center 
							color #707070
							margin-left -1px
							cursor pointer
						.selectLi
							color #428ced
							background-color #ffffff
							border-right 1px solid #dedede
							border-left 1px solid #dedede
					.resourcescontent
						width 100%
						li
							width 100%
							padding 20px
							overflow hidden
							.left
								float left
								width 90px
								height 90px
								background-color #aaa
								background url(../../../../static/img/excel.png) no-repeat 50% 50%
							.right
								float left
								height 90px
								padding-left 20px
								.name
									color #428ced
									font-size 16px
									line-height 30px
								.details
									color #414141
									font-size 12px
									line-height 30px
								.source
									color #707070
									font-size 12px
									line-height 30px
									span 
										float left
									.department
										width 100px
@media (max-width: 1600px)
	.catelogsearch
		.searchContent
			.resultsContent	
				.directoryNavigation
					.lefttree
						width 25%
@media (max-width: 1450px)
	.catelogsearch
		.searchContent
			.resultsContent	
				.directoryNavigation
					.lefttree
						width 20%
</style>