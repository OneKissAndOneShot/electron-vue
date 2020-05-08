<template>
  <div class="home">
    <div class="home-top">
      <label class="inp-label">
        <input class="inp" v-model.trim="text" placeholder="添加TODO" type="text" @keyup.enter.native="addList" />
      </label>
      <div class="inp-btn" @click="addList">添加</div>
    </div>
    <div class="home-list">
      <div class="home-todo">
        <div class="todo-title">未完成</div>
        <div class="todo-list">
          <template v-if="list.some(i => !i.finished)">
            <template v-for="item in list">
              <div class="item" :key="item.id" @click="todoClick(item)" v-if="!item.finished">
                <div :class="['icon', {'todo-icon': item.icon}]"></div>
                <div class="content">
                  <div class="left">
                    <div class="txt">{{item.todo}}</div>
                    <div class="time">{{item.time}}</div>
                  </div>
                  <div class="del" @click.stop="del(item)">
                    <img src="@/assets/delete.png" alt="del">
                  </div>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <img class="no-list" src="@/assets/none.png" alt="none">
            <div class="no-tip">暂无记录</div>
          </template>
        </div>
      </div>
      <div class="home-do">
        <div class="do-title">已完成</div>
        <div class="do-list">
          <template v-if="list.some(i => i.finished)">
            <template v-for="item in list">
              <div class="item" :key="item.id" @click="doClick(item)" v-if="item.finished">
                <div :class="['icon', {'do-icon': item.icon}]"></div>
                <div class="content">
                  <div class="left">
                    <div class="txt">{{item.todo}}</div>
                    <div class="time">{{item.time}}</div>
                  </div>
                  <div class="del" @click.stop="del(item)">
                    <img src="@/assets/delete.png" alt="del">
                  </div>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <img class="no-list" src="@/assets/none.png" alt="none">
            <div class="no-tip">暂无记录</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import db from "@/utils/db";

export default {
  setup() {
    const { ctx } = getCurrentInstance();
    const text = ref('');
    const list = ref([]);
    let timer = null;
    const addList = () => {
      if (ctx.text === '') return;
      db.get("list").insert({
        todo: text.value,
        time: new Date().toLocaleString().replace(/\//g, '-'),
        finished: false
      }).write();
      list.value = db.get("list").value();
      text.value = '';
      console.log(db.get("list").value());
    };
    const todoClick = item => {
      if (timer) return;
      item.icon = true;
      timer = setTimeout(() => {
        delete item.icon
        db.get("list").find({ id: item.id }).set("finished", true).write();
        list.value = db.read().get("list").value();
        timer = null;
      }, 300);
    };
    const doClick = item => {
      if (timer) return;
      item.icon = true;
      timer = setTimeout(() => {
        delete item.icon
        db.get("list").find({ id: item.id }).set("finished", false).write();
        list.value = db.read().get("list").value();
        timer = null;
      }, 300);
    };
    const del = item => {
      db.get("list").remove({ id: item.id }).write();
      list.value = db.read().get("list").value();
    };
    onMounted(() => {
      db.defaults({ list: [] }).write();
      list.value = db.get("list").value();
    });
    return {
      text,
      list,
      todoClick,
      doClick,
      addList,
      del
    };
  }
};
</script>

<style lang="less" scoped>
.home-top {
  display: flex;
  align-items: center;
  justify-content: center;
}

.inp-label {
  .inp {
    width: 40vw;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    color: #606266;
    padding: 0 15px;
    outline: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    transition: all .3s;

    &:focus {
      border-color: #40a9ff;
      box-shadow: 0 0 0 2px rgba(24, 144, 255, .2);
    }

    &::placeholder {
      font-size: 14px;
      color: #aaaaaa;
    }
  }
}

.inp-btn {
  color: #fff;
  font-size: 14px;
  min-width: 80px;
  height: 34px;
  line-height: 34px;
  cursor: pointer;
  user-select: none;
  background-color: #1890ff;
  margin-left: 5px;
  border-radius: 2px;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, .045);
  transition: all .3s;

  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
}

.home-list {
  display: flex;
  margin-top: 10px;

  .item {
    display: flex;
    align-items: center;
    text-align: left;
    min-width: 350px;
    padding: 5px 8px;
    cursor: pointer;
    border-bottom: 1px dashed #d9d9d9;

    &:last-child {
      border-bottom: unset;
    }

    .icon {
      position: relative;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #1890ff;
      margin-right: 10px;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) scale(0);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #1890ff;
        transition: all .3s;
      }
    }

    .todo-icon {
      &:after {
        transform: translateX(-50%) translateY(-50%) scale(1);
        transition: all .3s;
      }
    }

    .do-icon {
      &:after {
        transform: translateX(-50%) translateY(-50%) scale(1);
        transition: all .3s;
      }
    }

    .content {
      flex: 1;
      display: flex;
      justify-content: space-between;

      .left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .txt {
      flex-shrink: 0;
      font-size: 14px;
      color: #2a2a2a;
      margin-right: 20px;
    }

    .time {
      flex-shrink: 0;
      font-size: 12px;
      color: #BCC3C5;
    }

    .del {
      display: none;
      width: 20px;
      height: 20px;
      margin-left: 20px;

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      background-color: #e7e7e7;

      .del {
        display: block;
      }
    }
  }

  .no-list {
    width: 100px;
    margin-top: 30px;
  }

  .no-tip {
    font-size: 14px;
    margin-top: 5px;
  }
}

.home-todo {
  flex: 1;
  flex-shrink: 0;
  margin-right: 20px;

  .todo-title {
    padding: 8px 0;
    margin-bottom: 10px;
    background-color: #FFEDE7;
    color: #F76333;
  }
}

.home-do {
  flex: 1;
  flex-shrink: 0;

  .do-title {
    padding: 8px 0;
    margin-bottom: 10px;
    background-color: #EFD;
    color: #89C557;
  }

  .do-list {
    .icon {
      border-color: #cccccc;

      &:after {
        background-color: #cccccc;
      }
    }

    .txt {
      color: #cccccc;
      text-decoration: line-through;
    }
  }
}
</style>
