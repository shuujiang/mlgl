<template>
  	<div class="catelognavigation innercontent">
          <p class="dcngtitle">目录导航</p>
          <ul class="dcngtabs">
              <li :class="{dcngselect: dcngselect}" @click='dcngtabsFun("ngss")'>系统导航</li>
              <li :class="{dcngselect: !dcngselect}" @click='dcngtabsFun("ngcs")'>自定义导航</li>
          </ul>
          <ul class="dcngcontent">
            <li class="Ngshow" v-for="(item,i) in NGlist" :key="i">
                <div class="Ngname">{{item.navigationName}}：</div>
                <div :class="{Ngcontent:true, Ngcontent1: !item.animation}">
                    <div v-for="(aitem,i) in item.children" :key="i" @click="ngtagaddFun(aitem)">
                        <i></i>
                        <span>{{aitem.navigationName}}</span>
                    </div>
                </div>
                <div class="Ngmore" @click="NgmoreFun(i)">
                    <span>{{item.label}}</span>
                    <i :class="{moreIcon: item.animation, moreIcon1: item.animation1}"></i>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
		data() {
			return {
                dcngselect:true,
				tableData:[],
				NGlist:[]
			};
		},
		methods: {
            dcngtabsFun(val){
                if(val == "ngss"){
                    this.dcngselect=true;
                }else{
                    this.dcngselect=false;
                }
            },
            ngtagaddFun(){
                this.$router.push({path:'/catelogquery/catelogsearch',query:{info:'123'}});
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
			}
		},
		created() {
			this.$axios.get("static/data/navigation.json").then(response => {
				const data = this.checkJSONType(response.data);
				this.tableData = data.tableData;
				this.NGlist = this.tableData.filter(item => item.superiorNgCode === "LM")
				this.NGlist.forEach(element => {
					element.label = "更多";
					element.animation = false;
					element.animation1 = false;
					element.children = this.tableData.filter(item => item.superiorNgCode === element.navigationCode)
				});
			});
		}
	};
</script>
<style lang="stylus">
    .catelognavigation
        .dcngtitle
            font-size 34px
            font-weight bold
            color #428ced
            text-align center
            line-height 60px
        .dcngtabs
            width 900px
            margin auto
            height 40px
            border-bottom 2px solid #428ced
            margin-top 20px
            padding 0 30px
            position relative
            &:
                before 
                    content ""
                    position absolute
                    width 10px
                    height 10px
                    border-radius 50% 
                    background-color #428ced
                    left -10px
                    bottom -5px
            &:
                after 
                    content ""
                    position absolute
                    width 10px
                    height 10px
                    border-radius 50% 
                    background-color #428ced
                    right -10px
                    bottom -5px
            li
                float left
                padding 0 22px
                height 40px
                margin-bottom -2px
                text-align center
                line-height 40px
                color #707070
            .dcngselect
                background-color #ffffff   
                color #428ced
                border 2px solid #428ced
                border-bottom-color rgba(0,0,0,0)
        .dcngcontent
            width 900px
            margin  auto
            .Ngshow
                overflow hidden
                border-top 1px dashed #dedede
                &:
                    nth-child(1) 
                        border-top 0px dashed #dedede
                .Ngname
                    float left
                    width 100px
                    height 100px
                    font-size 20px
                    font-weight bold
                    line-height 162px
                    color #428ced
                .Ngcontent
                    float left
                    width 740px
                    margin 15px 0
                    overflow hidden
                    div
                        cursor pointer
                        float left
                        margin 15px 11px
                        width 98px
                        height 112px
                        text-align center                    
                        color #313131
                        font-size 12px
                        i 
                            float left
                            width 62px
                            height 62px
                            margin 10px 18px 8px  18px 
                            border 2px solid #428ced
                            border-radius 50% 50%
                            background url(../../../../static/img/dcngtext.png) no-repeat 50% 50% / 60%
                            &:
                                hover 
                                    background url(../../../../static/img/dcngtext1.png) no-repeat 50% 50% / 60%
                                    background-color #428ced                                
                        span 
                            width 100%
                            height 32px
                            float left
                .Ngcontent1
                    height 142px                
                .Ngmore
                    float left
                    width 60px
                    height 62px
                    color #707070
                    cursor pointer
                    span 
                        float left
                        width 40px
                        height 100%
                        line-height 62px
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
</style>
