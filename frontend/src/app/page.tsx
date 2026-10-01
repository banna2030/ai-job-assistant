"use client";

import { ChangeEvent, useState } from "react";

type CvAnalysisResult = {
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    recommendations: string[];
};

export default function Home() {
    const [cv, setCv] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");

    const [result, setResult] = useState<CvAnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (file.type !== "application/pdf") {
            setError("Please upload a PDF file.");
            setCv(null);
            return;
        }

        setError("");
        setCv(file);
    }

    async function handleAnalyze() {
        if (!cv) {
            setError("Please upload your CV.");
            return;
        }

        if (!jobDescription.trim()) {
            setError("Please enter the job description.");
            return;
        }

        setLoading(true);
        setError("");
        setResult(null);

        const formData = new FormData();

        formData.append("cv", cv);
        formData.append("jobDescription", jobDescription);

        try {
            const response = await fetch(
                "http://localhost:8080/api/cv/analyze",
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to analyze CV.");
            }

            const data: CvAnalysisResult = await response.json();

            setResult(data);
        } catch (error) {
            console.error(error);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        AI Job Assistant
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Upload your CV and compare it with a job description using AI.
                    </p>
                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

                        <h2 className="mb-6 text-xl font-semibold text-gray-900">
                            Job Application
                        </h2>

                        {/* CV */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-800">
                                Upload CV
                            </label>

                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 transition hover:border-gray-500 hover:bg-gray-50">

                <span className="mb-2 text-lg font-medium text-gray-700">
                  Choose PDF
                </span>

                                <span className="text-sm text-gray-500">
                  PDF files only
                </span>

                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>

                            {cv && (
                                <div className="mt-3 rounded-lg bg-gray-100 px-4 py-3">
                                    <p className="text-sm font-medium text-gray-800">
                                        {cv.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {(cv.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Job Description */}
                        <div className="mb-6">
                            <label className="mb-2 block font-medium text-gray-800">
                                Job Description
                            </label>

                            <textarea
                                value={jobDescription}
                                onChange={(event) =>
                                    setJobDescription(event.target.value)
                                }
                                rows={12}
                                placeholder="Paste the job description here..."
                                className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-gray-600"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full rounded-xl bg-black py-3.5 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {loading ? "Analyzing CV..." : "Analyze CV"}
                        </button>

                    </section>

                    {/* RIGHT SIDE */}
                    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">

                        {!result && !loading && (
                            <div className="flex min-h-[500px] items-center justify-center">
                                <div className="text-center">
                                    <div className="mb-4 text-5xl">
                                        📄
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-800">
                                        Your analysis will appear here
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Upload your CV and enter a job description to get started.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Loading */}
                        {loading && (
                            <div className="flex min-h-[500px] items-center justify-center">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

                                    <p className="font-medium text-gray-700">
                                        Gemini is analyzing your CV...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Result */}
                        {result && !loading && (
                            <div>

                                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                                    CV Analysis
                                </h2>

                                {/* Score */}
                                <div className="mb-8 flex items-center justify-between rounded-2xl bg-gray-100 p-6">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Match Score
                                        </p>

                                        <p className="mt-1 text-4xl font-bold text-gray-900">
                                            {result.matchScore}%
                                        </p>
                                    </div>

                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-gray-900">
                    <span className="text-xl font-bold text-gray-900">
                      {result.matchScore}
                    </span>
                                    </div>

                                </div>

                                {/* Matching Skills */}
                                <div className="mb-8">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                        Matching Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {result.matchingSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800"
                                            >
                        ✓ {skill}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Missing Skills */}
                                <div className="mb-8">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                        Missing Skills
                                    </h3>

                                    <div className="flex flex-wrap gap-2">
                                        {result.missingSkills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-red-100 px-3 py-1.5 text-sm font-medium text-red-800"
                                            >
                        {skill}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div>
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">
                                        Recommendations
                                    </h3>

                                    <div className="space-y-3">
                                        {result.recommendations.map(
                                            (recommendation, index) => (
                                                <div
                                                    key={index}
                                                    className="rounded-xl border border-gray-200 bg-gray-50 p-4"
                                                >
                                                    <div className="flex gap-3">

                            <span className="font-bold text-gray-400">
                              {index + 1}.
                            </span>

                                                        <p className="text-sm leading-6 text-gray-700">
                                                            {recommendation}
                                                        </p>

                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                            </div>
                        )}

                    </section>

                </div>
            </div>
        </main>
    );
}