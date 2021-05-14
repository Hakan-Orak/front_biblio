<template>
  <div class="container">
    <div class="row justify-content-end">
      <button type="button" class="btn btn-primary" @click="openAddUser">+ Ajouter un utilisateur</button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">Email</th>
        <th scope="col">Profil</th>
        <th scope="col">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.nom }}</td>
        <td>{{ user.prenom }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.profil }}</td>
        <td>
          <button type="button" class="btn btn-secondary" @click="openUpdateUser(user)">Modifier</button>
          <button type="button" class="btn btn-danger" @click="openDeleteUser(user)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <modal name="addUser" :height="400" :width="500">
      <div class="modal-body">
        <div class="form-title text-center">
          <h4>Ajouter un utilisateur</h4>
        </div>

        <div class="d-flex flex-column text-center">
          <div class="form-group">
            <input type="text" v-model="addNom" class="form-control" placeholder="Nom de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="text" v-model="addPrenom" class="form-control" placeholder="Prénom de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="email" v-model="addEmail" class="form-control" placeholder="Email de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="password" v-model="addPassword" class="form-control" id="password1" placeholder="Mot de passe" />
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="addProfil" id="addProfilClient" value="CLIENT" checked />
            <label class="form-check-label" for="addProfilClient"> Client </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="addProfil" id="addProfilAdmin" value="ADMIN" />
            <label class="form-check-label" for="addProfilAdmin"> Admin </label>
          </div>
        </div>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button type="button" class="btn btn-success" @click="onAddUser">Ajouter</button>
        <button type="button" class="btn btn-secondary" @click="onCancelAdd">Annuler</button>
      </div>
    </modal>

    <modal name="deleteUser" :height="200" :width="500">
      <div class="modal-body">
        <div class="form-title text-center">
          <h4>Supprimer un utilisateur</h4>
        </div>
        <span v-if="selectedUser">Êtes-vous sûr de vouloir supprimer {{ selectedUser.nom }} {{ selectedUser.prenom }} ?</span>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button type="button" class="btn btn-danger" @click="onDelete">Supprimer</button>
        <button type="button" class="btn btn-secondary" @click="onCancelDelete">Annuler</button>
      </div>
    </modal>

    <modal name="updateUser" :height="400" :width="500">
      <div class="modal-body">
        <div class="form-title text-center">
          <h4>Modifier un utilisateur</h4>
        </div>

        <div class="d-flex flex-column text-center" v-if="selectedUser">
          <div class="form-group">
            <input type="text" v-model="selectedUser.nom" class="form-control" placeholder="Nom de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="text" v-model="selectedUser.prenom" class="form-control" placeholder="Prénom de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="email" v-model="selectedUser.email" class="form-control" placeholder="Email de l'utilisateur" />
          </div>
          <div class="form-group">
            <input type="password" v-model="selectedUser.password" class="form-control" id="password1" placeholder="Mot de passe" />
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="selectedUser.profil" id="addProfilClient" value="CLIENT" checked />
            <label class="form-check-label" for="addProfilClient"> Client </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="selectedUser.profil" id="addProfilAdmin" value="ADMIN" />
            <label class="form-check-label" for="addProfilAdmin"> Admin </label>
          </div>
        </div>
      </div>
      <div class="modal-footer d-flex justify-content-center">
        <button type="button" class="btn btn-success" @click="onUpdateUser">Modifier</button>
        <button type="button" class="btn btn-secondary" @click="onCancelUpdate">Annuler</button>
      </div>
    </modal>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import VModal from 'vue-js-modal';
Vue.use(VModal);
export default {
  data() {
    return {
      users: [],
      //Add User
      addNom: '',
      addPrenom: '',
      addEmail: '',
      addPassword: '',
      addProfil: 'CLIENT',
      //Delete/Update User
      selectedUser: null
    };
  },
  created() {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios
          .get('http://localhost:8085/api/v1/users', {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.log('erreur');
            console.log(error);
          });
    },
    openAddUser() {
      this.$modal.show('addUser');
    },
    onCancelAdd() {
      this.addNom = '';
      this.addPrenom = '';
      this.addEmail = '';
      this.addPassword = '';
      this.addProfil = 'CLIENT';
      this.$modal.hide('addUser');
    },
    onAddUser() {
      if (this.addNom != '' && this.addPrenom != '' && this.addEmail != '' && this.addPassword != '' && this.addProfil != '') {
        axios
            .post('http://localhost:8085/api/v1/users', {
              nom: this.addNom,
              prenom: this.addPrenom,
              email: this.addEmail,
              password: this.addPassword,
              profil: this.addProfil,
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            })
            .then(response => {
              console.log('POST REALISE');
              console.log(response.data);
              this.onCancelAdd();
              this.getUsers();
            })
            .catch(error => {
              console.log('erreur');
              console.log(error);
            });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    },
    openDeleteUser(user) {
      this.selectedUser = { ...user };
      this.$modal.show('deleteUser');
    },
    onCancelDelete() {
      this.$modal.hide('deleteUser');
      this.selectedUser = null;
    },
    onDelete() {
      axios
          .delete('http://localhost:8085/api/v1/users/' + this.selectedUser.id, {
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
          .then(response => {
            console.log('Utilisateur supprimé');
            console.log(response.data);
            this.onCancelDelete();
            this.getUsers();
          })
          .catch(error => {
            console.log('erreur');
            console.log(error);
          });
    },
    openUpdateUser(user) {
      this.selectedUser = { ...user };
      this.$modal.show('updateUser');
    },
    onCancelUpdate() {
      this.$modal.hide('updateUser');
      this.selectedUser = null;
    },
    onUpdateUser() {
      if (this.selectedUser && this.selectedUser.nom != '' && this.selectedUser.prenom != '' && this.selectedUser.email != '' && this.selectedUser.password != '' && this.selectedUser.profil != '') {
        axios
            .put('http://localhost:8085/api/v1/users/' + this.selectedUser.id, {
              nom: this.selectedUser.nom,
              prenom: this.selectedUser.prenom,
              email: this.selectedUser.email,
              password: this.selectedUser.password,
              profil: this.selectedUser.profil,
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            })
            .then(response => {
              console.log('Utilisateur modifié');
              console.log(response.data);
              this.onCancelUpdate();
              this.getUsers();
            })
            .catch(error => {
              console.log('erreur');
              console.log(error);
            });
      } else {
        alert('Veuillez remplir tous les champs');
      }
    }
  }
};
</script>
<style scoped></style>
