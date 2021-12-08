<template>
    <div>
        <form @submit.prevent="cadastrar">
            <h2>Formulario</h2>
            <p>
                <label for="modelo">Modelo do veiculo: </label>
                <input type="text" id="modelo" 
                required autofocus 
                v-model="modelo">
            </p>
            <p>
                <label for="valor_automovel">Valor R$: </label>
                <input type="text" id="valor_automovel" 
                required 
                v-model="valor_automovel">
            </p>
            <p>
                <label for="depreciacao">Depreciacao: </label>
                <input type="text" id="depreciacao" 
                required 
                v-model="depreciacao">
            </p>
            <button type="submit">Salvar</button>
            
        </form>

        <div>
            <button type="submit" @click="getFormInfo">Sincronizar</button>
        </div>
    
        <br>

        <table v-if="this.verificaAdmin()">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Modelo</th>
                    <th>Valor</th>
                    <th>Depreciacao</th>
                    <th>Usuario</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="form in formularios" :key="form.id">
                    <td>{{ form.id }}</td>
                    <td>{{ form.modelo }}</td>
                    <td>{{ form.valor_automovel }}</td>
                    <td>{{ form.depreciacao }}</td>
                    <td>{{ form.usuario.nome }}</td>
                    <button class="delete-btn" @click="deleteform(form.id)"> Deletar</button>
                </tr>
            </tbody>
        </table>

        <table v-else>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Modelo</th>
                    <th>Valor</th>
                    <th>Depreciacao</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="form in formularios" :key="form.id">
                    <td>{{ form.id }}</td>
                    <td>{{ form.modelo }}</td>
                    <td>{{ form.valor_automovel }}</td>
                    <td>{{ form.depreciacao }}</td>
                    <button class="delete-btn" @click="deleteform(form.id)"> Deletar</button>
                </tr>
            </tbody>
        </table>

    </div>

</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'anotacoes',
    data(){
        return {
            modelo: '',
            valor_automovel: '',
            depreciacao: '',
            formularios: []
        }
    },
    computed: {
        ...mapState([
            'usuario',
            'senha'
        ])
    },
    methods: {
        cadastrar() {
            axios.post('formulario',
            {
                modelo: this.modelo,
                valor_automovel: this.valor_automovel,
                depreciacao: this.depreciacao,
                usuario:{nome:this.usuario}
            }
            )
            .then(res => {
                console.log(res);
                this.modelo = '';
                this.valor_automovel = '';
                this.depreciacao = '';
                this.formularios.push(res.data);
            })
            .catch(error => console.log(error))
        },
        verificaAdmin() {
            if(localStorage.getItem('role') == '[ROLE_ADMIN]'){
                console.log('Usuario é admin');
                return true
            }else{
                console.log('Usuario NÃO é admin');
                return false
            }
        },
        getFormInfo() {
            if(this.verificaAdmin()){
                axios.get("formulario", {
                })
                .then((res) => {  

                this.formularios=res.data.map(formularios => formularios);

                console.log(res);
                })
                .catch((error) => console.log(error));
            }
            else {
                axios.get("formulario/usuario?usuario=" + this.usuario, {
                    })
                    .then((res) => {  

                    this.formularios=res.data.map(formularios => formularios);

                    console.log(res);
                    })
                    .catch((error) => console.log(error));
            }
        },
        deleteform(indice){
            axios.delete("formulario/delete/" + indice, {
                    })
                    .then((res) => { 
                    this.getFormInfo();
                    console.log(res);
                    
                    })
                    .catch((error) => console.log(error));
             
        }
    }
}
</script>