"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Floating Code Card - Premium "Messy Desk" aesthetic
 * Glass effect, colored glow shadow, floating tech icons
 */
export function FloatingCodeCard() {
  return (
    <div className="relative">
      {/* Aurora Glow - Behind everything */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-[100px] -z-10" />

      {/* Floating Tech Icons - Parallax depth */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute -top-8 -left-6 z-0"
      >
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg shadow-zinc-200/50 flex items-center justify-center border border-zinc-100">
          <Image
            src="https://cdn.simpleicons.org/python/3776AB"
            alt="Python"
            width={24}
            height={24}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute -bottom-6 -right-4 z-20"
      >
        <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg shadow-zinc-200/50 flex items-center justify-center border border-zinc-100">
          <Image
            src="https://cdn.simpleicons.org/apachespark/E25A1C"
            alt="Spark"
            width={20}
            height={20}
          />
        </div>
      </motion.div>

      {/* Background Terminal Window (Empty) - Rotated 3deg */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute -top-4 -right-6 z-0"
      >
        <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded-xl shadow-xl overflow-hidden w-80 h-48">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-800 bg-zinc-900/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            </div>
            <span className="text-[10px] text-zinc-500 ml-2 font-mono">terminal</span>
          </div>
          {/* Terminal Content */}
          <div className="p-3 font-mono text-[11px] text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">➜</span>
              <span className="text-zinc-400">~/projects</span>
              <span className="text-zinc-600">git:(main)</span>
            </div>
            <div className="mt-1 text-zinc-600">$ spark-submit pipeline.py</div>
            <div className="mt-1 text-zinc-700">Running...</div>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-emerald-500">➜</span>
              <span className="w-2 h-4 bg-zinc-600 animate-pulse" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Code Window - Glass Effect with Colored Glow */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        whileHover={{ rotate: 0, scale: 1.02, y: -4 }}
        className="relative z-10"
      >
        <div className="bg-white/90 backdrop-blur-md border border-zinc-200/80 rounded-2xl shadow-2xl shadow-blue-500/20 overflow-hidden max-w-lg">
          {/* Window Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-100/80 bg-zinc-50/80">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-zinc-400 ml-2 font-mono">data_pipeline.py</span>
          </div>

          {/* Code Content - Light Theme */}
          <div className="p-5 font-mono text-[13px] leading-relaxed overflow-x-auto bg-white/80">
            {/* Imports */}
            <div>
              <span className="text-purple-600">from</span>
              <span className="text-zinc-800"> pyspark.sql </span>
              <span className="text-purple-600">import</span>
              <span className="text-zinc-800"> SparkSession</span>
            </div>
            <div>
              <span className="text-purple-600">from</span>
              <span className="text-zinc-800"> airflow.decorators </span>
              <span className="text-purple-600">import</span>
              <span className="text-zinc-800"> task</span>
            </div>

            {/* Decorator */}
            <div className="mt-4">
              <span className="text-amber-600">@task</span>
            </div>

            {/* Function definition */}
            <div>
              <span className="text-purple-600">def</span>{" "}
              <span className="text-blue-600">process_telemetry</span>
              <span className="text-zinc-800">(</span>
              <span className="text-orange-600">source</span>
              <span className="text-zinc-800">):</span>
            </div>

            {/* Spark session */}
            <div className="ml-4 mt-1">
              <span className="text-zinc-800">spark = </span>
              <span className="text-blue-600">SparkSession</span>
              <span className="text-zinc-800">.builder</span>
            </div>
            <div className="ml-8">
              <span className="text-zinc-800">.appName(</span>
              <span className="text-green-600">&quot;Pipeline&quot;</span>
              <span className="text-zinc-800">).getOrCreate()</span>
            </div>

            {/* Comment */}
            <div className="ml-4 mt-3">
              <span className="text-zinc-400"># Ingesting TB-scale streams</span>
            </div>

            {/* Read parquet */}
            <div className="ml-4">
              <span className="text-zinc-800">df = spark.read.parquet(source)</span>
            </div>

            {/* Transform chain */}
            <div className="ml-4 mt-2">
              <span className="text-zinc-800">clean_df = df.filter(df.score </span>
              <span className="text-purple-600">&gt;</span>
              <span className="text-zinc-800"> </span>
              <span className="text-amber-600">0.95</span>
              <span className="text-zinc-800">) \</span>
            </div>
            <div className="ml-8">
              <span className="text-zinc-800">.repartition(</span>
              <span className="text-amber-600">100</span>
              <span className="text-zinc-800">)</span>
            </div>

            {/* Return */}
            <div className="ml-4 mt-2">
              <span className="text-purple-600">return</span>
              <span className="text-zinc-800"> {"{"}</span>
              <span className="text-green-600">&quot;rows&quot;</span>
              <span className="text-zinc-800">: </span>
              <span className="text-green-600">&quot;50B+&quot;</span>
              <span className="text-zinc-800">, </span>
              <span className="text-green-600">&quot;status&quot;</span>
              <span className="text-zinc-800">: </span>
              <span className="text-green-600">&quot;✓&quot;</span>
              <span className="text-zinc-800">{"}"}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FloatingCodeCard;
