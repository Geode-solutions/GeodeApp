<template>
  <v-app>
    <v-main
      class="custom-background drop-zone"
      @dragover.prevent="showDropZone = true"
      @dragleave.prevent="showDropZone = false"
      @drop="onDrop"
      @mousemove="handleMouseMove"
    >
      <NuxtPage style="z-index: 1" />
      <TopBar />
      <SideBar />
      <FeedBackSnackers />

      <v-btn
        class="icon-style"
        :class="[
          'toggle-drawer-btn',
          { 'drawer-open': showStepper, show: showButton || showStepper },
        ]"
        color="white"
        @click="toggleDrawer"
        icon
        style="border-radius: 20%"
      >
        <v-icon
          >{{ showStepper ? "mdi-chevron-right" : "mdi-chevron-left" }}
        </v-icon>
      </v-btn>

      <transition name="slide">
        <v-navigation-drawer
          class="rounded"
          radius="10px"
          :width="500"
          location="right"
          temporary
          v-model="showStepper"
        >
          <StepImport
            v-if="showStepper"
            :files="droppedFiles"
            @close="showStepper = false"
          />
        </v-navigation-drawer>
      </transition>
      <v-card class="drop-zone" />
    </v-main>
  </v-app>
</template>

<script setup>
const feedback_store = use_feedback_store();

const showDropZone = ref(false);
const showStepper = ref(false);
const droppedFiles = ref([]);
const showButton = ref(false);

const onDrop = (e) => {
  e.preventDefault();

  const files = e.dataTransfer.files;
  const isSidebarIcon = e.dataTransfer.getData("text/plain") === "sidebar-icon";

  if (isSidebarIcon) {
    return;
  }

  if (files.length === 0) {
    feedback_store.add_error(
      500,
      "/internal",
      "Internal error",
      "No file dropped."
    );
  } else {
    feedback_store.add_success(
      `File(s) dropped : ${files[0].name} ${files[0].type}`
    );
    droppedFiles.value = Array.from(files);
    showStepper.value = true;
  }

  showDropZone.value = false;
};

const handleMouseMove = (e) => {
  const screenWidth = window.innerWidth;
  const threshold = 75;
  if (e.clientX > screenWidth - threshold) {
    showButton.value = true;
  } else {
    showButton.value = false;
  }
};

const toggleDrawer = () => {
  droppedFiles.value = [];
  showStepper.value = !showStepper.value;
};
</script>

<style>
.drop-zone {
  background-color: transparent;
  border-width: 0;
  border: solid 0px transparent;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-drawer-btn {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 2;
  transform: translateY(-50%);
  transition: right 0.3s, opacity 0.3s;
  opacity: 0;
}

.toggle-drawer-btn.drawer-open {
  right: 500px;
}

.toggle-drawer-btn.show {
  opacity: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
