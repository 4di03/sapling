/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

//! # Communicating to EdenFS via Thrift

mod client;
pub mod status;

pub use client::EdenFsClient;
