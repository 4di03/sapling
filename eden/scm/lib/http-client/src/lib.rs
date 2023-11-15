/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

//! An async-compatible HTTP client built on top of libcurl.

#![allow(dead_code)]

mod client;
mod driver;
mod errors;
mod event_listeners;
mod handler;
mod header;
mod pool;
mod progress;
mod receiver;
mod request;
mod response;
mod stats;
mod stream;

pub use client::Config;
pub use client::HttpClient;
pub use client::ResponseFuture;
pub use client::StatsFuture;
use curl::easy::Easy2;
pub use curl::easy::HttpVersion;
pub use errors::Abort;
pub use errors::HttpClientError;
pub use errors::TlsError;
pub use errors::TlsErrorKind;
use handler::HandlerExt;
pub use header::Header;
pub use progress::Progress;
pub use receiver::Receiver;
pub use request::Encoding;
pub use request::Method;
pub use request::MinTransferSpeed;
pub use request::Request;
pub use request::RequestContext;
pub use request::RequestInfo;
pub use request::StreamRequest;
pub use response::AsyncBody;
pub use response::AsyncResponse;
pub use response::Response;
pub use stats::Stats;
pub use stream::BufferedStream;
pub use stream::CborStream;

/// The only Easy2 type used by this crate.
pub(crate) type Easy2H = Easy2<Box<dyn HandlerExt>>;
