<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { computed, ref, watchEffect } from 'vue'
import Label from './ui/label/Label.vue'
import { useListStore } from '@/stores/list'
import router from '@/router'

const noNewGames = defineModel({ default: false })

const listStore = useListStore()

const myGames = listStore.myGames

const games = computed(() =>
  listStore.games.filter(
    game => !(myGames ?? []).find(myGame => myGame.game === game),
  ),
)

watchEffect(() => (noNewGames.value = games.value.length === 0))

const isPopoverOpen = ref(false)
const value = ref('')
const createList = async () => {
  await useListStore().addList(value.value)
  console.log('createList', value.value)
  isPopoverOpen.value = false
  console.log('createList', isPopoverOpen.value)
  router.push('/list/' + value.value)
}
</script>
<template>
  <Dialog v-model:open="isPopoverOpen">
    <DialogTrigger> New List </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new Collectable List</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div>
        <Label style="margin-right: 2rem">Game</Label>
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              class="w-[200px] justify-between"
            >
              {{
                value ? games.find(game => game === value) : 'Select game...'
              }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search game..." />
              <CommandEmpty>No Game found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="game in games"
                    :key="game"
                    :value="game"
                    @select="
                      ev => {
                        if (typeof ev.detail.value === 'string') {
                          value = ev.detail.value
                        }
                      }
                    "
                  >
                    {{ game }}
                    <Check
                      :class="
                        cn(
                          'ml-auto h-4 w-4',
                          value === game ? 'opacity-100' : 'opacity-0',
                        )
                      "
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <DialogFooter>
        <Button @click="createList"> Create new List</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
