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
import { ref } from 'vue'
import Label from './ui/label/Label.vue'

const games = [{ value: 'warframe', label: 'Warframe' }]
const open = ref(false)
const value = ref('')
const createList = () => {
  console.log('create list: ' + value.value)
}
</script>
<template>
  <Dialog>
    <DialogTrigger> New List </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create new Collectable List</DialogTitle>
        <DialogDescription> </DialogDescription>
      </DialogHeader>
      <div>
        <Label style="margin-right: 2rem">Game</Label>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-[200px] justify-between"
            >
              {{
                value
                  ? games.find(framework => framework.value === value)?.label
                  : 'Select game...'
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
                    v-for="framework in games"
                    :key="framework.value"
                    :value="framework.value"
                    @select="
                      ev => {
                        if (typeof ev.detail.value === 'string') {
                          value = ev.detail.value
                        }
                        open = false
                      }
                    "
                  >
                    {{ framework.label }}
                    <Check
                      :class="
                        cn(
                          'ml-auto h-4 w-4',
                          value === framework.value
                            ? 'opacity-100'
                            : 'opacity-0',
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
      <DialogFooter
        ><Button @click="createList"> Create new List</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
