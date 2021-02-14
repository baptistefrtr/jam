<template>
  <b-container v-if="this.userData">
    <h1>Store</h1>
    <b-row>
      <b-col cols="9">
        <b-list-group style="height: 80vh; overflow-y: scroll; overflow-x: hidden">
          <b-list-group-item style="padding: 0; border: 0; margin-bottom: 15px"
                             v-for="(value, idx) in this.userData.items" :key="idx">
            <b-button
                squared
                block
                variant="outline-secondary"
                @click="buyItem(idx)"
                style="padding-top: 0px; padding-bottom: 0px; border: 0"
            >
              <Item v-if="value.name === 'Flint'"
                    :item="value.name"
                    :img="require('@/assets/past/Flint.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/flintBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Fire'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/fireBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Bow'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    style="background-image: url('https://i.pinimg.com/originals/85/4d/cd/854dcd215dbeb47334fdd8024a051954.png');"
              ></Item>
              <Item v-if="value.name === 'Wheel'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    style="background-image: url('https://i.pinimg.com/originals/af/54/2d/af542d89a7722b3ba7d078247d3314fe.gif');"
              ></Item>
              <Item v-if="value.name === 'Writing'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/writingBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Town'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/townBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Church'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/churchBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Boat'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/boatBack.jpg') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Photography'"
                    :item="value.name"
                    :img="require('@/assets/past/photoBack.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/photoBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Train'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/trainBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Electricity'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/townBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Phone'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/phoneBack.jpg') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Computer'"
                    :item="value.name"
                    :img="require('@/assets/present/computerBack.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/computerBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Disk'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/gamesBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Coca'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/cocaBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Games'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/zeldaBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Rocket'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/rocketBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Covid'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/present/covidBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Dolorean'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/futur/doloreanBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Motherboard'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/futur/motherboardBack.jpg') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Hologram'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/futur/hologramBack.jpg') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Dolorean'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/townBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Motherboard'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/townBack.png') + ') '}"
              ></Item>
              <Item v-if="value.name === 'Hologram'"
                    :item="value.name"
                    :img="require('@/assets/past/fire.png')"
                    :nbItem="value.amount"
                    :price="value.price"
                    v-bind:style="{ backgroundImage: 'url(' + require('@/assets/past/townBack.png') + ') '}"
              ></Item>
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col cols="3">
       <div style="height: 80vh; overflow-y: scroll; overflow-x: hidden">
           <div style="padding: 0; border: 0;" v-for="(value, idx) in this.userData.items" :key="idx"
           >
             <Upgrade v-if="value.name === 'Flint' && value.upgrades[0].locked" :item=" value.name" :level="1"
                   :img="require('@/assets/past/Flint.png')"
                   :price="value.upgrades[0].price"
                   :index="idx"
                   :multiplier="value.upgrades[0].multiplier"
                   @buy="buyUpgrade"
                   style="background-image: url('https://i.pinimg.com/originals/af/54/2d/af542d89a7722b3ba7d078247d3314fe.gif');"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Flint' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/Flint.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Flint' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/Flint.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Fire' && value.upgrades[0].locked" :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Fire' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Fire' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Bow' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :index="idx"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Bow' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Bow' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Wheel' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Wheel' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Wheel' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Writing' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Writing' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Writing' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Town' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Town' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2" :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Town' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Church' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Church' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Church' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Boat' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Boat' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2" :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Boat' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Photography' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Photography' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Photography' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Train' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Train' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Train' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Electricity' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Electricity' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Electricity' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Phone' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Phone' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Phone' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Computer' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                   :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Computer' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                   :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Computer' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Disk' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Disk' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Disk' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Coca' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Coca' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Coca' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Games' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Games' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Games' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Rocket' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Rocket' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Rocket' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Covid' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Covid' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Covid' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Dolorean' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Dolorean' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Dolorean' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Motherboard' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Motherboard' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Motherboard' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-if="value.name === 'Hologram' && value.upgrades[0].locked"
                   :item=" value.name" :level="1"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[0].price"
                      :multiplier="value.upgrades[0].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade v-else-if="value.name === 'Hologram' && !value.upgrades[0].locked && value.upgrades[1].locked"
                   :item=" value.name" :level="2"
                   :img="require('@/assets/past/fire.png')"
                   :price="value.upgrades[1].price"
                      :multiplier="value.upgrades[1].multiplier"
                   :index="idx"
                   @buy="buyUpgrade"
             ></Upgrade>
             <Upgrade
                 v-else-if="value.name === 'Hologram' && !value.upgrades[0].locked && !value.upgrades[1].locked && value.upgrades[2].locked"
                 :item=" value.name" :level="3"
                 :img="require('@/assets/past/fire.png')"
                 :price="value.upgrades[2].price"
                 :multiplier="value.upgrades[2].multiplier"
                 :index="idx"
                 @buy="buyUpgrade"
             ></Upgrade>
           </div>
       </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Item from "@/components/Shop/Item";
import Upgrade from "@/components/Shop/Upgrade";

export default {
  components: {
    Item,
    Upgrade,
  },
  name: "Shop",
  props: ["userData"],
  data() {
    return {
      upgrades: []
    }
  },
  methods: {
    buyItem(value) {
      this.$emit("buyItem", value);
      //   this.userData.past[value]
      console.log(value);
    },
    buyUpgrade(value) {
      for (let i = 0; i !== this.userData.items[i].upgrades.length; i++) {
        if (this.userData.items[value].upgrades[i].locked === true && this.userData.time >= this.userData.items[value].upgrades[i].price) {
          this.$emit("buyUpgrade", value);
          break;
        }
      }
    }
  },
  mounted() {

  }
};
</script>

<style scoped></style>
