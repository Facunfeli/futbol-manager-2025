"use client"

import { useState, useEffect } from "react"

interface UseApiOptions {
  autoFetch?: boolean
}

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const fetchData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }

  const postData = async (body: any) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }

  const putData = async (body: any) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }

  const deleteData = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      setState({ data: null, loading: false, error: null })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setState((prev) => ({ ...prev, loading: false, error: errorMessage }))
      throw error
    }
  }

  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchData()
    }
  }, [url])

  return {
    ...state,
    refetch: fetchData,
    post: postData,
    put: putData,
    delete: deleteData,
  }
}
