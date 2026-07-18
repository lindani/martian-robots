'use client';

import { useState, type ChangeEvent } from 'react';
import axios from 'axios';

const SAMPLE_INPUT = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL`;

export default function Home() {
	const [input, setInput] = useState<string>(SAMPLE_INPUT);
	const [output, setOutput] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleProcess = async (): Promise<void> => {
		const trimmedInput = input.trim();

		if (!trimmedInput) {
			setError('Please provide at least one line of mission data.');
			setOutput('');
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const inputLines = trimmedInput.split(/\r?\n/).filter(Boolean);
			const res = await axios.post('http://localhost:3001/api/simulate', inputLines);
			setOutput(res.data.output || 'No output returned.');
		} catch (err: unknown) {
			console.error(err);
			if (axios.isAxiosError(err) && err.response?.data?.error) {
				setError(String(err.response.data.error));
			} else {
				setError('Could not connect to the backend. Make sure the simulator service is running.');
			}
			setOutput('');
		} finally {
			setLoading(false);
		}
	};

	const handleLoadSample = (): void => {
		setInput(SAMPLE_INPUT);
		setOutput('');
		setError(null);
	};

	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-6xl flex-col gap-6">
				<section className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/80 shadow-2xl shadow-slate-950/50 backdrop-blur-xl">
					<div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
						<div className="flex flex-col justify-between gap-6">
							<div className="space-y-4">
								<span className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
									Mission Control
								</span>
								<h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
									Martian Robots Simulator
								</h1>
								<p className="max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
									Paste your robot instructions, run the simulation, and inspect each final position in a polished command console.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								<button
									type="button"
									onClick={handleProcess}
									className="rounded-full bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-500/60"
									disabled={loading}
								>
									{loading ? 'Processing...' : 'Run Simulation'}
								</button>
								<button
									type="button"
									onClick={handleLoadSample}
									className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
								>
									Load sample input
								</button>
							</div>

							<div className="grid gap-3 sm:grid-cols-3">
								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<p className="text-sm text-slate-400">Input format</p>
									<p className="mt-1 font-medium text-white">Grid size + robot instructions</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<p className="text-sm text-slate-400">Output</p>
									<p className="mt-1 font-medium text-white">Final coordinates and heading</p>
								</div>
								<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
									<p className="text-sm text-slate-400">Ready</p>
									<p className="mt-1 font-medium text-white">Connects to the local sim service</p>
								</div>
							</div>
						</div>

						<div className="rounded-[1.5rem] border border-cyan-400/20 bg-slate-950/80 p-4 sm:p-5">
							<div className="mb-3 flex items-center justify-between">
								<p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Mission input</p>
								<span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
									Live
								</span>
							</div>
							<textarea
								className="min-h-[240px] w-full rounded-2xl border border-white/10 bg-slate-900/90 p-4 font-mono text-sm text-slate-100 outline-none ring-0 transition focus:border-cyan-400/50"
								placeholder="Enter mission data here..."
								value={input}
								onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
							/>
							<p className="mt-3 text-sm leading-6 text-slate-400">
								Each line should be a separate instruction, such as the grid size and each robot&apos;s starting position plus movement string.
							</p>
						</div>
					</div>
				</section>

				<section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
					<div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30 backdrop-blur">
						<h2 className="text-lg font-semibold text-white">Input guide</h2>
						<p className="mt-3 text-sm leading-7 text-slate-400">
							Use a first line for the grid bounds, then one block per robot with its starting coordinates and orientation.
						</p>
						<pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-7 text-cyan-200">
							{`5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL`}
						</pre>
					</div>

					<div className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/30 backdrop-blur">
						<div className="flex items-center justify-between gap-3">
							<h2 className="text-lg font-semibold text-white">Simulation output</h2>
							<span className={`rounded-full px-3 py-1 text-xs font-semibold ${output ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/10 text-slate-300'}`}>
								{output ? 'Completed' : 'Awaiting run'}
							</span>
						</div>

						{error ? (
							<div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">
								{error}
							</div>
						) : null}

						{loading ? (
							<div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-cyan-200">
								<div className="h-3 w-3 animate-pulse rounded-full bg-cyan-300" />
								Running your mission...
							</div>
						) : output ? (
							<pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/80 p-4 font-mono text-sm leading-7 text-slate-200">
								{output}
							</pre>
						) : (
							<div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-sm leading-7 text-slate-400">
								Press the run button to see the final robot positions and headings appear here.
							</div>
						)}
					</div>
				</section>
			</div>
		</main>
	);
}