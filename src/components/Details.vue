<template>
  <div>
    <v-card :loading="loading" class="mx-auto my-12" max-width="500">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in photos"
          :key="i"
          :src="item"
        ></v-carousel-item>
      </v-carousel>

      <v-card-title>{{ resto.name }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :value="resto.rating"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>

          <div class="grey--text ml-4">({{ resto.rating }})</div>
        </v-row>

        <div class="my-4 subtitle-1">
          {{ resto.price }}
        </div>

        <div class="my-4 subtitle-1">N°: {{ resto.display_phone }}</div>
        <div class="my-4 subtitle-1">
          Nombre de vue: {{ resto.review_count }}
        </div>

        <div>{{ resto.alias }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Heures d'ouvertures</v-card-title>

      <v-card-text>
        <div
          v-if="resto.hours.__ob__.value[0].open[0] != undefined"
          class="overline mb-4"
        >
          Lundi ouvre à {{ resto.hours.__ob__.value[0].open[0].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[0].end }}h
        </div>
        <div
          v-if="resto.hours.__ob__.value[0].open[1] != undefined"
          class="overline mb-4"
        >
          Mardi ouvre à {{ resto.hours.__ob__.value[0].open[1].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[1].end }}h
        </div>
        <div
          v-if="resto.hours.__ob__.value[0].open[2] != undefined"
          class="overline mb-4"
        >
          Mercredi ouvre à {{ resto.hours.__ob__.value[0].open[2].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[2].end }}h
        </div>
        <div
          v-if="resto.hours.__ob__.value[0].open[3] != undefined"
          class="overline mb-4"
        >
          Jeudi ouvre à {{ resto.hours.__ob__.value[0].open[3].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[3].end }}h
        </div>
        <div
          v-if="resto.hours.__ob__.value[0].open[4] != undefined"
          class="overline mb-4"
        >
          Vendredi ouvre à {{ resto.hours.__ob__.value[0].open[4].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[4].end }}h
        </div>
        <div
          v-if="resto.hours.__ob__.value[0].open[5] != undefined"
          class="overline mb-4"
        >
          Samedi ouvre à {{ resto.hours.__ob__.value[0].open[5].start }}h et
          ferme à {{ resto.hours.__ob__.value[0].open[5].end }}h
        </div>
      </v-card-text>

      <v-card-actions>
        <v-app id="inspire">
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  reserve
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline"
                    >Réservations chez {{ resto.name }}</span
                  >
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Nom *"
                          required
                          v-model="text.Name"
                          :counter="10"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12"> </v-col>

                      <v-col cols="12">
                        <v-text-field
                          label="Email*"
                          v-model="text.Email"
                          required
                          :counter="20"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="text.date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="text.date"
                              label="jour de réservation *"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="text.date"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(text.date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                        <v-select
                          :items="['20:30', '21:00', '22:00', '22:30']"
                          label="Horaire de resvation *"
                          v-model="text.Horaire"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="items"
                          :menu-props="{ top: true, offsetY: true }"
                          label="Le nombre de personne *"
                          v-model="text.nb"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          name="input-7-1"
                          label="Message particulier *"
                          value=""
                          v-model="text.msg"
                          hint="Hint text"
                          :counter="250"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>* indique un champ obligatoire</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-2" color="secondary" @click="dialog = false">
                    close
                  </v-btn>
                  <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    @click="addresto"
                  >
                    Save
                    <v-icon right dark> mdi-cloud-upload </v-icon>
                  </v-btn>
                  <v-btn class="ma-2" color="success" @click="paye()">
                    Paye la reservation
                    <template v-slot:loader>
                      <span>Loading...</span>
                    </template>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-app>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
//     import Firebase from 'firebase'
import toastr from "toastr";
import { apiYelp } from "../api/yelp.js";
import FirebaseDataService from "../api/FirebaseDataService.js";

const supportedInstruments = [
  {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: [
        "visa",
        "mastercard",
        "amex",
        "discover",
        "diners",
        "jcb",
        "unionpay",
      ],
    },
  },
];
const details = {
  displayItems: [
    {
      label: "Prix de la resarvation",
      amount: { currency: "USD", value: "0.00" },
    },
  ],
  total: {
    label: "Total due",
    amount: { currency: "USD", value: "0.00" },
  },
};
let IdUser = Math.floor(Math.random() * (10000000000000000 - 1 + 1)) + 1;
console.log("ya wlad l9a7ab" + IdUser);

IdUser = "";

export default {
  name: "app",


  data() {
    return {
      text: {
        Name: "",
        valid: true,
        Email: "",
        nb: "",
        date: new Date().toISOString().substr(0, 10),
        msg: "",
        Horaire: "",
        Is_checkOut: "false",
      },

      loading: false,
      items: ["1", "2", "3", "4", "5", "6"],
      selection: 1,
      photos: [],
      id: this.$route.params.id,
      resto: [],
      dialog: "",
      catego: [],
      menu: false,
      modal: false,
      menu2: false,
      documentId: null,
    };
  },
  async created() {
    try {
      const res = await apiYelp.get(`businesses/${this.id}`);
      this.resto = res.data;
      console.log(this.resto);
      console.log(this.resto.hours);

      const resp = await apiYelp.get(`businesses/${this.id}`);
      this.photos = resp.data.photos;
      console.log(this.photos);

      const respo = await apiYelp.get(`businesses/${this.id}`);
      this.catego = respo.data.categories;
      console.log(this.catego);
    } catch (e) {
      this.errors.push(e);
    }
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    paye: async function () {
      const request = new PaymentRequest(supportedInstruments, details);
      try {
        const result = await request.show();
        this.update(this.documentId);
        this.$router.push(`/Paiement`);
        this.dialog = false;
        console.log("ICI tu es dans le paymemnt")
        return result.complete("success");
      } catch (error) {
        console.error(error);
      }
    },

   
    update: function () {
      console.log("UPDATE", this.documentId);
      FirebaseDataService.updateCheckout(this.documentId);
    },
    addresto: function () {

      // toastr.success("Bien enregister dans la base de donne");
       console.log("Bien enregister dans la base de donne");
      console.log(this.text.date, this.text.Horaire,this.text.Name,this.text.Email,this.text.nb);
      this.documentId = FirebaseDataService.addReservation(
        this.text.Name,
        this.text.Email,
        this.text.nb,
        this.text.date,
        this.text.Horaire,
        this.text.msg,
        this.resto.name
      ).then((id) => {
        if (id != null) this.documentId = id;
        else this.error = "Impossible d'effectuer une reservation";
      });
      toastr.success("Added");
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
</style>