const createURL = (path) => {
      return window.location.origin + path
}
export const updatedEntry = async (id, content) => {
      const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
            method: 'PATCH',
            body: JSON.stringify({ content })
      }))

      if (res.ok) {
            const data = await res.json()
            return data.data
      }

}

export const createNewEntry = async () => {
      const res = await fetch(new Request(createURL('/api/journal'), {
            method: 'POST',
      }))

      if (res.ok) {
            const data = await res.json()
            console.log('!!Create New Entry Response:', data);
            return data.data
      }
      else {
            console.log('!!Errrrr:', res);

      }
}

export const askQuestion = async (question) => {
      const res = await fetch(new Request(createURL('/api/question'), {
            method: 'POST',
            body: JSON.stringify({ question })
      }))

      if (res.ok) {
            const data = await res.json()
            return data.data
      }
}
