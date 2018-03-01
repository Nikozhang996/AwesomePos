<template>
  <div class="pos">
    <div>
      <el-row>
        <!--Element支持用24栏的形式进行布局。-->
        <el-col class="pos-order" ref="orderList" :span="7">
          <el-tabs>
            <el-tab-pane label="点餐">
              点餐
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>

          <el-table :data="tableData" border show-summary style="width: 100%">
            <el-table-column prop="goodsName" label="商品"></el-table-column>
            <el-table-column prop="count" label="量" width="50"></el-table-column>
            <el-table-column prop="price" label="金额" width="70"></el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template scope="scope">
                <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-button type="warning">挂单</el-button>
          <el-button type="danger" @click="delAllGoods">清空列表</el-button>
          <el-button type="success">结账</el-button>
        </el-col>

        <el-col :span="17">
          <div class="often-goods">
            <div class="often-goods-title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="(item,index) in oftenGoods" :key="index" @click="addOrderList(item)">
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">{{item.price | fn}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="goods-type">
            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="(item,index) in typeGoods.hamburger" :key="index" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="(item,index) in typeGoods.snack" :key="index" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="(item,index) in typeGoods.drinks" :key="index" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="(item,index) in typeGoods.setmeal" :key="index" @click="addOrderList(item)">
                    <span class="foodImg">
                      <img :src="item.goodsImg" width="100%">
                    </span>
                    <span class="foodName">{{item.goodsName}}</span>
                    <span class="foodPrice">￥{{item.price}}</span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {getOftenGoods, getTypeGoods} from "../../api";

  export default {
    name: "pos",
    data () {
      return {
        orderHeight: document.body.clientHeight,
        tableData: [
          {
            goodsId: 11,
            goodsName: '可口可乐',
            price: 8,
            count: 1
          },
          {
            goodsId: 1,
            goodsName: '香辣鸡腿堡',
            price: 15,
            count: 1
          },
          {
            goodsId: 13,
            goodsName: '爱心薯条',
            price: 8,
            count: 1
          },
          {
            goodsId: 14,
            goodsName: '甜筒',
            price: 8,
            count: 1
          }
        ],
        oftenGoods: [],
        typeGoods: {
          hamburger: [],
          snack: [],
          drinks: [],
          setmeal: []
        }
      }
    },
    created () {
      this.tableData = JSON.parse(localStorage.getItem('tableData')) || this.tableData;

      this.getOftenGoods();

      this.getTypeGoods();
    },
    mounted () {
      this.$refs.orderList.$el.style.height = this.orderHeight + 'px';
    },
    methods: {
      // 获取常用商品
      async getOftenGoods () {
        let {data} = await getOftenGoods();
        this.oftenGoods = data;
      },

      // 获取各类商品
      async getTypeGoods () {
        let {data} = await getTypeGoods();
        let [hamburger, snack, drinks, setmeal] = data;
        this.typeGoods.hamburger = hamburger;
        this.typeGoods.snack = snack;
        this.typeGoods.drinks = drinks;
        this.typeGoods.setmeal = setmeal;
      },


      addOrderList (item) {
        let isHave = this.tableData.some(value => value.goodsId === item.goodsId);

        if (!isHave) {
          item.count = 1;
          this.tableData.unshift(item);
        } else {
          this.tableData.forEach((value, index) => {
            if (value.goodsId === item.goodsId) {
              value.count++;
            }
          });

          // 结构赋值？
          this.tableData = [...this.tableData];
        }
      },
      delSingleGoods (item) {
        // 清除本地存储数据
        localStorage.clear();

        this.tableData = this.tableData.filter(value => value.goodsId !== item.goodsId);
      },
      delAllGoods () {
        this.tableData = [];
      }
    },
    watch: {
      // 监听点菜数据变化，并写入本地存储
      tableData: {
        handler() {
          localStorage.setItem('tableData', JSON.stringify(this.tableData));
        },
        deep:true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .pos-order {
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
  }

  .often-goods-title {
    height: 20px;
    border-bottom: 1px solid #D3DCE6;;
    background-color: #F9FAFC;
    padding: 10px;
  }

  .often-goods-list {
    li {
      list-style: none;
      float: left;
      border: 1px solid #E5E9F2;
      padding: 10px;
      margin: 5px;
      background-color: #fff;
      .o-price {
        color: #58B7FF;
      }
    }
  }

  .goods-type {
    clear: both;
  }

  .cookList {
    li {
      list-style: none;
      width: 23%;
      border: 1px solid #E5E9F2;
      height: auto;
      overflow: hidden;
      background-color: #fff;
      padding: 2px;
      float: left;
      margin: 2px;
      span {

        display: block;
        float: left;
      }
      .foodImg {
        width: 40%;
      }

      .foodName {
        font-size: 18px;
        padding-left: 10px;
        color: brown;

      }

      .foodPrice {
        font-size: 16px;
        padding-left: 10px;
        padding-top: 10px;
      }
    }

  }
</style>
