import { useCallback, useEffect, useRef, useState } from "react"

export const useUpload = () => {
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState("")
    const [error, setError] = useState("")

    const fileRef = useRef(null)

    // 1. Wrap in useCallback to prevent unneeded child re-renders
    const handleFileChange = useCallback((e) => {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) {
            return
        }
        const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Only jpeg, png, and webp are allowed.")
            setFile(null)
            if (fileRef.current) fileRef.current.value = "" // Clear via ref
            return
        }

        const maxSize = 5 * 1024 * 1024
        if (selectedFile.size > maxSize) {
            setError("Size should not be more than 5 MB.")
            setFile(null)
            if (fileRef.current) fileRef.current.value = "" // Clear via ref
            return
        }

        setFile(selectedFile)
        setError("")
    }, [])

    // 2. Automatically sync preview string when file changes
    useEffect(() => {
        if (!file) {
            setPreview("")
            return
        }

        const imageUrl = URL.createObjectURL(file)
        setPreview(imageUrl)

        return () => {
            URL.revokeObjectURL(imageUrl)
        }
    }, [file])

    // 3. Clear hook state and reset input element reference
    const resetFile = useCallback(() => {
        setFile(null)
        setError("")
        if (fileRef.current) {
            fileRef.current.value = ""
        }
    }, [])

    return { handleFileChange, file, preview, error, fileRef, resetFile }
}
