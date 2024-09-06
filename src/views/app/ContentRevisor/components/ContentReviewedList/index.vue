<script setup lang="ts">
import Typography from '../../../../../components/Typography/index.vue';
</script>

<template>
  <div class="h-full">
    <!-- Esse componente tem que ser um componente async -->
    <!-- Ver se é possível criar uma logica para salvar o texto original ou o arquivo adicionado -->
    <!-- caso seja uma logica para salvar o arquivo, ver se é possível fazer o download do mesmo -->
    <!-- ver a possibilidade de criar um sistema de refinar a revisao -->
    <div class="h-full overflow-auto">
      <ul class="flex flex-col gap-3">
        <li class="flex justify-between w-full rounded-lg shadow-md py-4 px-6 bg-white">
          <div>
            <Typography tag="h3" variant="h3">Titulo 1</Typography>
            <p>Conteúdo revisado</p>
            <p>
              Preview do conteudo Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat voluptatibus...
            </p>
            <p>tags da revisão</p>
          </div>
          <div class="flex">
            <p>copiar</p>
            <p>visualizar</p>
            <p>remover</p>
          </div>
        </li>
        <li class="flex justify-between w-full rounded-lg shadow-md py-2 px-4 bg-white">
          <div>
            <Typography tag="h3" variant="h3">Titulo 2</Typography>
            <p>Conteúdo revisado</p>
            <p>
              Preview do conteudo Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat voluptatibus...
            </p>
            <p>tags da revisão</p>
          </div>
          <div class="flex">
            <p>copiar</p>
            <p>visualizar</p>
            <p>remover</p>
          </div>
        </li>
        <li class="flex justify-between w-full rounded-lg shadow-md py-2 px-4 bg-white">
          <div>
            <Typography tag="h3" variant="h3">Titulo 3</Typography>
            <p>Conteúdo revisado</p>
            <p>
              Preview do conteudo Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Fugiat voluptatibus...
            </p>
            <p>tags da revisão</p>
          </div>
          <div class="flex">
            <p>copiar</p>
            <p>visualizar</p>
            <p>remover</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
