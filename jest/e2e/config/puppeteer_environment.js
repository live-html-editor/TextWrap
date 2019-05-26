/**
 * @author [S. Mahdi Mir-Ismaili](https://mirismaili.github.io)
 * Created on 1398/3/1 (2019/5/22).
 */
'use strict'

const fs = require('fs')
const path = require('path')
const os = require('os')

const NodeEnvironment = require('jest-environment-node')
// noinspection NpmUsedModulesInstalled
const puppeteer = require('puppeteer')   // Cannot find module 'puppeteer' => See the note in "./setup.js"

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

class PuppeteerEnvironment extends NodeEnvironment {
	constructor(config) {
		super(config)
	}
	
	async setup() {
		await super.setup()
		const wsEndpoint = fs.readFileSync(path.join(DIR, 'wsEndpoint'), 'utf8')
		if (!wsEndpoint) throw new Error('wsEndpoint not found')
		
		// noinspection JSUndefinedPropertyAssignment
		this.global.__BROWSER__ = await puppeteer.connect({browserWSEndpoint: wsEndpoint})
	}
	
	async teardown() {
		await super.teardown()
	}
	
	runScript(script) {
		return super.runScript(script)
	}
}

module.exports = PuppeteerEnvironment
