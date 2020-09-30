<template>
  <b-container>
    <b-row>
      <b-col class="mt-5" lg="9">
        <registration-form></registration-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RegistrationForm from "@/components/RegistrationForm";

export default {
  components: {
    RegistrationForm
  }
}
</script>
